# Hydration Mismatch Fix

## Problem

React hydration error occurred because components rendered differently on the server vs client:

```
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties.
```

**Root Cause:** Components using `useMediaQuery` and dynamic positioning rendered with different values during SSR vs client-side hydration.

## Components Fixed

### 1. Spotlight Component (`components/ui/spotlight.tsx`)
**Issue:** Mouse position state caused different inline styles between server and client.

**Fix:**
- Added `mounted` state to track client-side hydration
- Render static centered gradient during SSR and on mobile
- Only render dynamic mouse-tracking gradient after mount on desktop
- Removed problematic `animate` prop that used window dimensions

**Before:**
```tsx
// Different rendering on server vs client
if (isMobile) {
  return <div style={{ background: 'radial-gradient(...)' }} />;
}
return <motion.div animate={{ x: position.x - window.innerWidth / 2 }} />;
```

**After:**
```tsx
// Same rendering on server and initial client render
if (!mounted || isMobile) {
  return <div style={{ background: 'radial-gradient(...)' }} />;
}
return <motion.div style={{ background: 'radial-gradient(...)' }} />;
```

### 2. InfiniteMovingCards Component (`components/ui/infinite-cards.tsx`)
**Issue:** Animation duration calculated differently based on `isMobile` hook.

**Fix:**
- Added `mounted` state
- Use desktop duration during SSR
- Only apply mobile-specific duration after mount

**Before:**
```tsx
const duration = speedMap[speed]; // Different on server vs client
```

**After:**
```tsx
const duration = speedMap[speed]; // Uses (mounted && isMobile) check
```

### 3. BentoGrid Component (`components/ui/bento-grid.tsx`)
**Issue:** Hover animation applied differently based on `isMobile`.

**Fix:**
- Added `mounted` state
- Disable hover animation during SSR
- Only enable after mount on desktop

**Before:**
```tsx
whileHover={isMobile ? {} : { scale: 1.02 }}
```

**After:**
```tsx
whileHover={mounted && !isMobile ? { scale: 1.02 } : {}}
```

### 4. useMediaQuery Hook (`lib/hooks/useMediaQuery.ts`)
**Issue:** Hook could return different values during SSR vs initial client render.

**Fix:**
- Added `mounted` state to track hydration
- Always return `false` during SSR
- Only return actual media query result after mount

**Before:**
```tsx
const [matches, setMatches] = useState(false);
return matches; // Could change immediately on mount
```

**After:**
```tsx
const [mounted, setMounted] = useState(false);
return mounted ? matches : false; // Consistent during SSR
```

## Pattern Used

All fixes follow the same pattern:

```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

// Use mounted flag to ensure SSR matches initial client render
if (!mounted) {
  return <StaticVersion />;
}

return <DynamicVersion />;
```

## Why This Works

1. **Server-Side Rendering:** `mounted` is `false`, renders static version
2. **Initial Client Render:** `mounted` is still `false`, renders same static version (hydration matches!)
3. **After Hydration:** `useEffect` runs, sets `mounted` to `true`, re-renders with dynamic version
4. **No Mismatch:** Server HTML matches initial client HTML perfectly

## Testing

### Before Fix
- Console error: "Hydration mismatch"
- Spotlight positioned incorrectly
- UI flickering on load

### After Fix
- No console errors
- Smooth hydration
- Correct positioning after mount
- Progressive enhancement (static → dynamic)

## Performance Impact

**Minimal:** 
- One extra render cycle after mount (unavoidable for SSR compatibility)
- Static version renders instantly
- Dynamic features activate within ~16ms (one frame)
- User experience: Seamless

## Best Practices Applied

1. ✅ **SSR-Safe Hooks:** Always consider server vs client differences
2. ✅ **Mounted Flag:** Use for any client-only features
3. ✅ **Progressive Enhancement:** Start static, enhance dynamically
4. ✅ **Consistent Initial Render:** Server HTML = Initial client HTML
5. ✅ **No Window Access in Render:** Only in useEffect

## Related Files

- `components/ui/spotlight.tsx` - Mouse tracking gradient
- `components/ui/infinite-cards.tsx` - Animated marquee
- `components/ui/bento-grid.tsx` - Hover effects
- `lib/hooks/useMediaQuery.ts` - Media query hook

## Verification

Run the dev server and check:
```bash
npm run dev
```

1. ✅ No hydration errors in console
2. ✅ Spotlight renders correctly
3. ✅ Tech stack marquee animates smoothly
4. ✅ Bento grid hover effects work
5. ✅ No UI flickering on page load

## Additional Notes

- This is a common Next.js SSR issue
- Always test components with SSR enabled
- Use `'use client'` directive for client-only components
- Consider using `dynamic` import with `ssr: false` for heavily client-dependent components

## References

- [React Hydration Docs](https://react.dev/link/hydration-mismatch)
- [Next.js SSR Best Practices](https://nextjs.org/docs/messages/react-hydration-error)
- [Framer Motion SSR](https://www.framer.com/motion/guide-ssr/)
