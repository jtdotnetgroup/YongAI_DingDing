
import layout from '../layout/layout.vue'

export const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        redirect: '/projectlist',
        meta: {},
        props: { tabbar: true, title: '永爱·项目管理', activetab: 'home' },
        component: layout,
        children: [
            {
                path: '/projectlist',
                name: 'projectlist',
                component: () => import('../views/Home/Index.vue')
            }
        ]
    },
    {
        path: '/mission',
        name: 'mission',
        props: { tabbar: true, title: '永爱·任务管理', rightIcon: 'plus', rightPath: '/MissionAdd', activetab: 'missionList' },
        meta: {},
        component: layout,
        children: [
            {
                path: '/missionList',
                name: 'missionList',
                component: () => import('../views/Mission/Index.vue')
            }
        ]
    },
    {
        path: '/report',
        name: 'report',
        props: { tabbar: true, title: '永爱·我的报表', activetab: 'ReportForms' },
        meta: {},
        component: layout,
        children: [{
            path:'/ReportForms',
            name:'ReportForms',
            component:()=>import('../views/ReportForms/Index.vue')

        }]
    },
    {
        path: '/message',
        name: 'message',
        props: { tabbar: true, title: '永爱·提醒', activetab: 'Information' },
        meta: {},
        component: layout,
        children: [{
            path:'/Information',
            name:'Information',
            component:()=>import('../views/Information/Index.vue')
        }]
    },
    {
        path: '/projectdetails',
        name: 'projectdetails',
        redirect: '/projectdetails/index',
        props: { tabbar: false, title: '项目详情' },
        component: layout,
        children: [
            {
                path: '/projectdetails/index',
                name: 'projectdetailsIndex',
                meta:{keepalive:true},
                component: () => import('../views/ProjectDetail/Index.vue')
            }

        ]

    },
    {
        path: '/MissionAdd',
        name: 'MissionAdd',
        props: { tabbar: false, title: '新建任务', rightIcon: 'wap-home', rightPath: '/home' },
        redirect: '/MissionAdd/index',
        component: layout,
        children: [
            {
                path: '/MissionAdd/index',
                name: 'MissionAdd',
                component: () => import('../views/Mission/Components/MissionAdd.vue')
            }
        ]

    },
    {
        path: '/MissionEdit',
        name: 'MissionEdit',
        props: { tabbar: false, title: '汇报任务', rightIcon: 'wap-home', rightPath: '/home' },
        redirect: '/MissionEdit/index',
        component: layout,
        children: [{
            path: '/MissionEdit/index',
            name: 'MissionEdit',
            component:()=>import('../views/Mission/Components/MissionEdit.vue')
        }]
    }

]