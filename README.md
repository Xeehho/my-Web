# my-Web
天马行空的idea
my-blog/
├── app/
│   ├── page.tsx     # 首页     
│   ├── layout.tsx       # 根布局
│   └── globals.css
│   ├── blog/
│   │   ├── page.tsx     # 博客列表
│   │   ├── [slug]/
│   │   │   ├── page.tsx # 博客详情
│   │   │   └── loading.tsx
│   │   └── layout.tsx
│   ├── dashboard/       # 需要登录的页面
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── api/             # Route Handlers
│   │   └── posts/
│   │       └── route.ts
├── components/
│   ├── ui/              # 基础UI组件
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   ├── layout/          # 布局组件
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── shared/          # 共享组件
├── lib/
│   ├── db.ts            # 数据库配置
│   ├── utils.ts         # 工具函数
│   └── constants.ts     # 常量
├── types/               # TypeScript类型定义
├── hooks/               # 自定义Hooks
├── public/
├── package.json
└── next.config.js