/**
 * Lighthouse CI Script
 * Runs Lighthouse audits and generates performance reports
 * 
 * Usage: node scripts/lighthouse.js
 * 
 * Requirements:
 * - npm install -g @lhci/cli lighthouse
 * - Dev server running on http://localhost:3000
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const LIGHTHOUSE_CONFIG = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1500 }],
        'interactive': ['error', { maxNumericValue: 3500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};

async function runLighthouse() {
  console.log('🚀 Starting Lighthouse audit...\n');

  // Create reports directory
  const reportsDir = path.join(process.cwd(), 'lighthouse-reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  try {
    // Check if server is running
    console.log('📡 Checking if dev server is running...');
    try {
      execSync('curl -s http://localhost:3000 > nul', { stdio: 'ignore' });
      console.log('✅ Dev server is running\n');
    } catch (error) {
      console.error('❌ Dev server is not running!');
      console.error('Please start the dev server with: npm run dev\n');
      process.exit(1);
    }

    // Run Lighthouse
    console.log('🔍 Running Lighthouse audit (3 runs)...\n');
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputPath = path.join(reportsDir, `lighthouse-${timestamp}.html`);
    const jsonPath = path.join(reportsDir, `lighthouse-${timestamp}.json`);

    const command = `lighthouse http://localhost:3000 \
      --output=html,json \
      --output-path="${path.join(reportsDir, `lighthouse-${timestamp}`)}" \
      --preset=desktop \
      --only-categories=performance,accessibility,best-practices,seo \
      --chrome-flags="--headless"`;

    execSync(command, { stdio: 'inherit' });

    console.log('\n✅ Lighthouse audit complete!\n');
    console.log(`📊 HTML Report: ${outputPath}.html`);
    console.log(`📄 JSON Report: ${jsonPath}.json\n`);

    // Parse and display results
    if (fs.existsSync(`${jsonPath}.json`)) {
      const results = JSON.parse(fs.readFileSync(`${jsonPath}.json`, 'utf-8'));
      
      console.log('📈 Lighthouse Scores:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      const categories = results.categories;
      Object.keys(categories).forEach((key) => {
        const category = categories[key];
        const score = Math.round(category.score * 100);
        const emoji = score >= 90 ? '🟢' : score >= 50 ? '🟡' : '🔴';
        console.log(`${emoji} ${category.title}: ${score}/100`);
      });
      
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      
      console.log('⚡ Core Web Vitals:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      const audits = results.audits;
      
      const fcp = audits['first-contentful-paint'];
      console.log(`FCP: ${fcp.displayValue} (target: < 1.5s)`);
      
      const tti = audits['interactive'];
      console.log(`TTI: ${tti.displayValue} (target: < 3.5s)`);
      
      const cls = audits['cumulative-layout-shift'];
      console.log(`CLS: ${cls.displayValue} (target: < 0.1)`);
      
      const lcp = audits['largest-contentful-paint'];
      console.log(`LCP: ${lcp.displayValue} (target: < 2.5s)`);
      
      const tbt = audits['total-blocking-time'];
      console.log(`TBT: ${tbt.displayValue} (target: < 300ms)`);
      
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      
      // Check if all scores meet targets
      const allPassed = Object.values(categories).every((cat: any) => cat.score >= 0.9);
      
      if (allPassed) {
        console.log('✅ All Lighthouse scores meet targets! 🎉\n');
      } else {
        console.log('⚠️  Some scores are below target. Check the HTML report for details.\n');
      }
    }

  } catch (error) {
    console.error('❌ Lighthouse audit failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runLighthouse();
}

export default runLighthouse;
