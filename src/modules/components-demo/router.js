import Layout from '@/layout';

const components = {
    path: '/components',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ComponentDemo',
    meta: {
        title: 'Components',
        icon: 'component'
    },
    children: [
        {
            path: 'tinymce',
            component: () => import('@/modules/components-demo/tinymce'),
            name: 'TinymceDemo',
            meta: { title: 'Tinymce' }
        },
        {
            path: 'markdown',
            component: () => import('@/modules/components-demo/markdown'),
            name: 'MarkdownDemo',
            meta: { title: 'Markdown' }
        },
        {
            path: 'json-editor',
            component: () => import('@/modules/components-demo/json-editor'),
            name: 'JsonEditorDemo',
            meta: { title: 'JsonEditor' }
        },
        {
            path: 'split-pane',
            component: () => import('@/modules/components-demo/split-pane'),
            name: 'SplitpaneDemo',
            meta: { title: 'SplitPane' }
        },
        {
            path: 'avatar-upload',
            component: () => import('@/modules/components-demo/avatar-upload'),
            name: 'AvatarUploadDemo',
            meta: { title: 'AvatarUpload' }
        },
        {
            path: 'dropzone',
            component: () => import('@/modules/components-demo/dropzone'),
            name: 'DropzoneDemo',
            meta: { title: 'Dropzone' }
        },
        {
            path: 'sticky',
            component: () => import('@/modules/components-demo/sticky'),
            name: 'StickyDemo',
            meta: { title: 'Sticky' }
        },
        {
            path: 'count-to',
            component: () => import('@/modules/components-demo/count-to'),
            name: 'CountToDemo',
            meta: { title: 'CountTo' }
        },
        {
            path: 'mixin',
            component: () => import('@/modules/components-demo/mixin'),
            name: 'ComponentMixinDemo',
            meta: { title: 'ComponentMixin' }
        },
        {
            path: 'back-to-top',
            component: () => import('@/modules/components-demo/back-to-top'),
            name: 'BackToTopDemo',
            meta: { title: 'BackToTop' }
        },
        {
            path: 'drag-dialog',
            component: () => import('@/modules/components-demo/drag-dialog'),
            name: 'DragDialogDemo',
            meta: { title: 'DragDialog' }
        },
        {
            path: 'drag-select',
            component: () => import('@/modules/components-demo/drag-select'),
            name: 'DragSelectDemo',
            meta: { title: 'DragSelect' }
        },
        {
            path: 'dnd-list',
            component: () => import('@/modules/components-demo/dnd-list'),
            name: 'DndListDemo',
            meta: { title: 'DndList' }
        },
        {
            path: 'drag-kanban',
            component: () => import('@/modules/components-demo/drag-kanban'),
            name: 'DragKanbanDemo',
            meta: { title: 'DragKanban' }
        }
    ]
};

export default components;
