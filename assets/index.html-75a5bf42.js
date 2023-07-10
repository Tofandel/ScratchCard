import{_ as r,r as o,o as c,c as d,a as n,b as t,d as s,e}from"./app-bbaaa0e8.js";const i={},p=e(`<h1 id="scratchcard-js" tabindex="-1"><a class="header-anchor" href="#scratchcard-js" aria-hidden="true">#</a> Scratchcard-js</h1><p>ScratchCard is a js lib to simulate a scratchcard in browser with html5 and canvas.</p><h2 id="install" tabindex="-1"><a class="header-anchor" href="#install" aria-hidden="true">#</a> Install</h2><p>You can install ScratchCard with npm:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npm install --save @tofandel/scratchcard-js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="import-scratchcard" tabindex="-1"><a class="header-anchor" href="#import-scratchcard" aria-hidden="true">#</a> Import ScratchCard</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> ScratchCard <span class="token keyword">from</span> <span class="token string">&#39;@tofandel/scratchcard-js&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="configuration" tabindex="-1"><a class="header-anchor" href="#configuration" aria-hidden="true">#</a> Configuration</h2>`,8),l={href:"/brushes/line",target:"_blank",rel:"noopener noreferrer"},u={href:"/brushes/spray",target:"_blank",rel:"noopener noreferrer"},h={href:"/brushes/circle",target:"_blank",rel:"noopener noreferrer"},m={href:"/brushes/brush",target:"_blank",rel:"noopener noreferrer"},g=e(`<table><thead><tr><th>Name</th><th>Type</th><th>Default value</th><th>Comment</th></tr></thead><tbody><tr><td><strong>scratchType</strong></td><td>SCRATCH_TYPE</td><td>LINE</td><td>Possibles values : LINE, SPRAY, CIRCLE, BRUSH</td></tr><tr><td><strong>percentToFinish</strong></td><td>number</td><td>50</td><td>The percentage at which the scratchcard will consider itself fully uncovered</td></tr><tr><td><strong>containerWidth</strong></td><td>number</td><td>100</td><td></td></tr><tr><td><strong>containerHeight</strong></td><td>number</td><td>100</td><td></td></tr><tr><td><strong>brushSrc</strong></td><td>string</td><td>&quot;&quot;</td><td>For type.BRUSH</td></tr><tr><td><strong>imageForwardSrc</strong></td><td>string</td><td>&quot;&quot;</td><td></td></tr><tr><td><strong>imageBackgroundSrc</strong></td><td>string</td><td>&quot;&quot;</td><td></td></tr><tr><td><strong>htmlBackground</strong></td><td>string</td><td>&quot;&quot;</td><td><br> <code>\`&lt;p&gt;Html-content&lt;p&gt;\`</code></td></tr><tr><td><strong>callback</strong></td><td>function</td><td>function() { alert(&#39;done.&#39;); }</td><td></td></tr><tr><td><strong>clearZoneRadius</strong></td><td>number</td><td>0</td><td>For type.CIRCLE and type.LINE</td></tr><tr><td><strong>nPoints</strong></td><td>number</td><td>30</td><td>For type.SPRAY</td></tr><tr><td><strong>pointSize</strong></td><td>number</td><td>4</td><td>For type.SPRAY</td></tr></tbody></table><h2 id="initialization-method" tabindex="-1"><a class="header-anchor" href="#initialization-method" aria-hidden="true">#</a> Initialization method</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>sc<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// Do what you want</span>
  <span class="token comment">// ex: listen scratch.move event</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// image not loaded</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="event-scratch-move" tabindex="-1"><a class="header-anchor" href="#event-scratch-move" aria-hidden="true">#</a> Event: scratch.move</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>sc<span class="token punctuation">.</span>canvas<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;scratch.move&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> percent <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">getPercent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function k(v,b){const a=o("ExternalLinkIcon");return c(),d("div",null,[p,n("p",null,[t("See the types in action: "),n("a",l,[t("Line"),s(a)]),t(", "),n("a",u,[t("Spray"),s(a)]),t(", "),n("a",h,[t("Circle"),s(a)]),t(", "),n("a",m,[t("Brush"),s(a)])]),g])}const _=r(i,[["render",k],["__file","index.html.vue"]]);export{_ as default};
