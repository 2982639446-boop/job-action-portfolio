import React from 'react';
import ReactDOM from 'react-dom/client';
import { ArrowDown, Check, CircleDot, FileSpreadsheet, Filter, Waypoints } from 'lucide-react';
import './styles.css';

const asset = './screens/';
const screens = {
  home: `${asset}home.png`,
  applications: `${asset}applications.png`,
  ai: `${asset}ai.png`,
  detail: `${asset}detail.png`,
  todayTasks: `${asset}today-tasks.png`,
  todayManualEntry: `${asset}today-manual-entry.png`,
  opportunityToApply: `${asset}opportunity-to-apply.jpg`,
  stageStatusTimeline: `${asset}stage-status-timeline.jpg`,
};

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Phone({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <div className={`phone ${className}`}><div className="phone-top"><i /><span /></div><img src={src} alt={alt} /></div>;
}

function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return <div className="section-title"><span>{eyebrow}</span><h2>{title}</h2>{desc && <p>{desc}</p>}</div>;
}

function EvidenceImage({ src, auxSrc, alt, caption, mode = 'default' }: { src: string; auxSrc?: string; alt: string; caption: string; mode?: 'default' | 'opportunity' | 'timeline' }) {
  return <figure className={`evidence-figure evidence-${mode}`}><div className="evidence-visual"><div className="evidence-crop"><img src={src} alt={alt} /></div>{auxSrc && <div className="evidence-aux"><img src={auxSrc} alt="首页手动新建待办入口" /></div>}</div><figcaption>{caption}</figcaption></figure>;
}

function App() {
  return <>
    <nav>
      <a href="#top" className="brand"><span>✓</span>求职进度管理</a>
      <div className="navlinks">
        <a href="#background">项目背景</a>
        <a href="#approach">产品策略</a>
        <a href="#design">关键设计决策</a>
        <a href="#outcome">项目实现</a>
      </div>
    </nav>

    <main id="top">
      <header className="hero single-hero">
        <div className="orb orb-a" /><div className="orb orb-b" />
        <div className="hero-copy">
          <div className="kicker"><span />PRODUCT CASE STUDY</div>
          <h1>面向求职全流程的<br /><em>信息与进度管理工具</em></h1>
          <p>整合多来源岗位信息，衔接机会筛选、投递管理、面试跟进与任务提醒，降低求职过程中的信息维护成本。</p>
          <div className="tags"><span>个人产品项目 · AI产品设计 · 微信小程序</span></div>
          <div className="hero-actions"><a className="primary-action" href="#background">查看项目 <ArrowDown size={16} /></a></div>
        </div>
        <div className="hero-visual single-phone">
          <div className="hero-glow" />
          <Phone src={screens.detail} alt="求职进度管理小程序投递详情" className="phone-main" />
          <div className="float-card f1"><Waypoints /><span><b>投递进度</b><small>阶段与状态分开记录</small></span></div>
          <div className="float-card f2"><Check /><span><b>今日待办</b><small>集中查看当前事项</small></span></div>
        </div>
      </header>

      <section id="background" className="section background-section">
        <Reveal><SectionTitle eyebrow="01 / 项目背景" title="项目背景" /></Reveal>
        <Reveal className="reading-copy">
          <p>秋招岗位信息通常分布于招聘平台、企业官网、共享表格、截图及社交渠道。用户在收集岗位后，仍需手动完成信息整理、机会筛选和投递状态维护。</p>
          <p>随着投递数量增加，岗位信息与流程信息逐渐分离，用户需要在多个工具之间确认投递阶段、面试安排和待跟进事项，信息维护成本随之增加。</p>
          <p>本项目尝试建立覆盖岗位收集、机会筛选、投递跟进和任务管理的连续流程，减少重复录入，并提升求职进度的可追踪性。</p>
        </Reveal>
      </section>

      <section className="section soft" id="problems">
        <Reveal><SectionTitle eyebrow="02 / 问题识别" title="问题识别" desc="经过对求职流程的拆解，问题主要集中于信息收集、流程衔接和进度维护三个环节。" /></Reveal>
        <Reveal className="problem-grid compact-grid">
          <article><span>01</span><h3>多来源信息缺乏统一结构</h3><p>岗位信息分布在 Excel、截图、文字和招聘平台中，字段格式与信息完整度不一致，增加了整理和维护成本。</p></article>
          <article><span>02</span><h3>岗位整理与投递流程相互割裂</h3><p>Excel 可以完成基础筛选，但筛选结果难以直接衔接待投递、笔试、面试及结果跟进等后续流程。</p></article>
          <article><span>03</span><h3>投递进度缺少统一状态表达</h3><p>同时跟进多个岗位时，仅记录面试阶段不足以反映当前进展，还需要区分待安排、待参加和等待结果等状态。</p></article>
        </Reveal>
        <Reveal className="insight compact-insight"><div className="insight-mark">“</div><p><b>设计认知</b><br />项目初期将重点放在岗位整理效率上。进一步分析后发现，现有表格已经能够满足基础筛选需求，更关键的流程断点在于：岗位完成整理后，无法持续衔接投递和面试跟进。因此，产品范围由单一的信息整理扩展为求职流程管理。</p></Reveal>
      </section>

      <section id="approach" className="section">
        <Reveal><SectionTitle eyebrow="03 / 产品策略" title="产品策略" desc="产品以岗位信息为基础，将机会筛选、投递管理、阶段跟进和任务提醒纳入同一流程，使岗位数据能够随用户决策持续流转。" /></Reveal>
        <Reveal className="flow-track five-steps compact-flow">
          {[[FileSpreadsheet, '岗位导入'], [Filter, '机会筛选'], [Check, '待投递确认'], [Waypoints, '阶段跟进'], [CircleDot, '任务归集']].map(([Icon, title], index) => {
            const FlowIcon = Icon as React.ComponentType<{ size?: number }>;
            return <div className="flow-step" key={String(title)}><span>0{index + 1}</span><FlowIcon /><h3>{String(title)}</h3></div>;
          })}
        </Reveal>
        <Reveal className="flow-summary">通过建立连续的数据流转关系，使岗位信息从静态记录转化为可持续维护的求职进度。</Reveal>
      </section>

      <section id="design" className="section soft core-designs">
        <Reveal><SectionTitle eyebrow="04 / 关键设计决策" title="关键设计决策" desc="围绕信息归类、状态表达和任务归集形成三项设计决策，以支持连续的投递进度管理。" /></Reveal>

        <Reveal className="design-row">
          <div className="design-copy"><span>01 / 机会与投递</span><h3>区分岗位机会与投递记录</h3><dl><dt>问题</dt><dd>批量导入的岗位仅代表潜在机会，并不等同于用户已经产生投递意向。若直接生成投递记录，将导致有效记录与待筛选信息混合。</dd><dt>设计策略</dt><dd>导入数据首先进入岗位机会列表，用户完成条件筛选与确认后，再将目标岗位加入待投递。</dd><dt>方案价值</dt><dd>在保留批量导入效率的同时，确保投递列表仅承载需要持续跟进的岗位。</dd></dl></div>
          <div className="screen-stage evidence-stage"><EvidenceImage src={screens.opportunityToApply} alt="待投递岗位筛选与投递确认界面" caption="导入结果先进入岗位机会列表，经过筛选与确认后再加入待投递。" mode="opportunity" /></div>
        </Reveal>

        <Reveal className="design-row reverse">
          <div className="design-copy"><span>02 / 阶段与状态</span><h3>拆分投递阶段与阶段状态</h3><dl><dt>问题</dt><dd>笔试、一面和二面等字段只能描述流程位置，无法完整表示事件是否已安排、是否已参加或是否正在等待结果。</dd><dt>设计策略</dt><dd>使用阶段字段记录求职流程位置，使用状态字段记录当前处理状态。例如：一面 · 待参加、一面 · 等待结果、二面 · 待安排时间。</dd><dt>方案价值</dt><dd>阶段与状态组合后，可以更准确地表达投递进展，并为提醒和待办生成提供判断依据。</dd></dl><div className="state-examples"><span>一面 · 待安排时间</span><span>一面 · 待参加</span><span>一面 · 等待结果</span><span>二面 · 待参加</span></div></div>
          <div className="screen-stage evidence-stage"><EvidenceImage src={screens.stageStatusTimeline} alt="投递详情中的阶段、状态与事件时间" caption="阶段记录流程位置，状态描述当前进展，两者组合形成完整的投递状态。" mode="timeline" /></div>
        </Reveal>

        <Reveal className="design-row">
          <div className="design-copy"><span>03 / 任务归集</span><h3>统一归集任务与流程事件</h3><dl><dt>问题</dt><dd>求职任务同时来自面试安排、笔试截止、岗位截止、结果跟进和用户手动计划，分散展示会增加检查成本。</dd><dt>设计策略</dt><dd>首页依据事件时间、截止时间和提醒时间，统一归集系统生成事项与用户手动待办。</dd><dt>方案价值</dt><dd>用户可以在单一入口查看当日需要处理的求职事项，减少在不同投递记录之间反复检查。</dd></dl></div>
          <div className="screen-stage evidence-stage"><EvidenceImage src={screens.todayTasks} auxSrc={screens.todayManualEntry} alt="首页今日待办中的面试、截止与跟进事项" caption="系统事件与手动任务按照时间统一归集，在首页形成当日待办。" /></div>
        </Reveal>
      </section>

      <section className="section ai-section">
        <Reveal className="ai-brief">
          <div><span>05 / AI 能力</span><h2>AI能力定位</h2><p>AI 主要承担非结构化信息的识别与整理，将截图和文字中的企业、岗位、城市及截止时间转换为可编辑字段。岗位筛选、投递确认和阶段调整仍由用户完成。</p><strong>AI 承担信息处理，用户保留最终决策权。</strong></div>
          <div className="capability-list">{[['Excel 岗位导入', '已实现'], ['图片 OCR 识别', '已实现'], ['文字信息整理', '已实现'], ['面经结构化整理', '已实现'], ['链接自动解析', '仍在完善']].map(([name, state]) => <p key={name}><span>{name}</span><b className={state === '仍在完善' ? 'pending' : ''}>{state}</b></p>)}</div>
        </Reveal>
      </section>

      <section id="outcome" className="section dark outcome-section">
        <Reveal><SectionTitle eyebrow="06 / 项目实现" title="项目实现" desc="项目覆盖需求分析、信息架构、状态模型、交互设计、界面优化及前端实现，并形成可运行的微信小程序版本。" /></Reveal>
        <Reveal className="outcome-grid outcome-copy-only">
          <div className="project-facts"><p><span>项目类型</span><b>个人产品项目</b></p><p><span>产品形态</span><b>微信小程序</b></p><p><span>负责范围</span><b>需求分析、产品设计、交互设计、界面优化与开发协作</b></p><p><span>技术实现</span><b>uni-app、Vue 3、TypeScript、Pinia、微信云开发</b></p><p><span>当前状态</span><b>核心流程已实现，链接解析功能仍在完善</b></p></div>
        </Reveal>
        <Reveal className="closing"><p>本项目的设计重点并非替代 Excel，而是补充岗位整理与投递跟进之间缺失的流程衔接。</p></Reveal>
      </section>
    </main>
  </>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
