import { createStarryNight } from '@wooorm/starry-night'
import cadence from '@wooorm/starry-night/source.cadence'
import { toHtml } from 'hast-util-to-html'


class CadenceHighlighter {

  sourceCadence: any;
  starryNight: any;
  isInstanceReady: boolean;

  constructor() {
    this.sourceCadence = cadence;
    this.starryNight = null;
    this.isInstanceReady = false;
    if (typeof window !== 'undefined') {
      this.createInstance();
    }
  }

  async createInstance() {
    const onigurumaUrl = new URL('/onig.wasm', window.location?.href);
    this.starryNight = await createStarryNight([this.sourceCadence], { 
        getOnigurumaUrlFetch : () => onigurumaUrl
      },
    );
    this.isInstanceReady = true;
  }

  async highlightCode(code) {
    if (!this.isInstanceReady) {
      await this.waitForInstanceReady();
    }

    const tree = this.starryNight.highlight(code, 'source.cadence');
    const html = toHtml(tree);
    return html;
  }

  async processCode(code, link = false) {
    const html = await this.highlightCode(code);
    return html;
  }

  waitForInstanceReady() {
    return new Promise<void>((resolve) => {
      const checkInstanceReady = () => {
        if (this.isInstanceReady) {
          resolve();
        } else {
          setTimeout(checkInstanceReady, 20);
        }
      };
      checkInstanceReady();
    });
  }
}

export default typeof window !== 'undefined' ? new CadenceHighlighter() : null;
