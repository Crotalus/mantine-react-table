import { type MRT_TableState } from 'mantine-react-table';

export type StateOption = {
  defaultValue?: string;
  description?: string;
  link?: string;
  linkText?: string;
  source?: 'MRT' | 'TanStack Table' | 'Mantine' | '';
  stateOption: keyof MRT_TableState<StateOption>;
  type?: string;
};

export const stateOptions: StateOption[] = [
  {
    defaultValue: '{}',
    description: '',
    link: 'https://tanstack.com/table/v8/docs/api/features/filters',
    linkText: 'TanStack Table Filters Docs',
    source: 'TanStack Table',
    stateOption: 'columnFilters',
    type: 'Array<{id: string, value: unknown}>',
  },
  {
    defaultValue: '[]',
    description: '',
    link: 'https://tanstack.com/table/v8/docs/api/features/column-ordering',
    linkText: 'TanStack Table Column Ordering Docs',
    source: 'TanStack Table',
    stateOption: 'columnOrder',
    type: 'Array<string>',
  },
  {
    defaultValue: '{ left: [], right: [] }',
    description: '',
    link: 'https://tanstack.com/table/v8/docs/api/features/column-pinning',
    linkText: 'TanStack Table Column Pinning Docs',
    source: 'TanStack Table',
    stateOption: 'columnPinning',
    type: '{ left: Array<string>, right: Array<string> }',
  },
  {
    defaultValue: '{}',
    description: '',
    link: 'https://tanstack.com/table/v8/docs/api/features/column-sizing',
    linkText: 'TanStack Table Column Sizing Docs',
    source: 'TanStack Table',
    stateOption: 'columnSizing',
    type: 'Record<string, number>',
  },
  {
    defaultValue: '{}',
    description: '',
    link: 'https://tanstack.com/table/v8/docs/api/features/column-sizing',
    linkText: 'TanStack Table Column Sizing Docs',
    source: 'TanStack Table',
    stateOption: 'columnSizingInfo',
    type: 'See TanStack Docs',
  },
  {
    defaultValue: '{}',
    description: '',
    link: 'https://tanstack.com/table/v8/docs/api/features/column-visibility',
    linkText: 'TanStack Table Column Visibility Docs',
    source: 'TanStack Table',
    stateOption: 'columnVisibility',
    type: 'Record<string, boolean>',
  },
  {
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    stateOption: 'creatingRow',
    type: 'MRT_Row',
  },
  {
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    stateOption: 'draggingColumn',
    type: 'MRT_Column | null',
  },
  {
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    stateOption: 'draggingRow',
    type: 'MRT_Row | null',
  },
  {
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    stateOption: 'editingCell',
    type: 'MRT_Cell',
  },
  {
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    stateOption: 'editingRow',
    type: 'MRT_Row',
  },
  {
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    stateOption: 'columnFilterFns',
    type: '{ [key: string]: MRT_FilterFn }',
  },
  {
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    stateOption: 'globalFilterFn',
    type: 'MRT_FilterFn',
  },
  {
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    stateOption: 'hoveredColumn',
    type: 'MRT_Column | null',
  },
  {
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    stateOption: 'hoveredRow',
    type: 'MRT_Row | null',
  },
  {
    defaultValue: '{}',
    description: '',
    link: 'https://tanstack.com/table/v8/docs/api/features/expanding',
    linkText: 'TanStack Table Expanding Docs',
    source: 'TanStack Table',
    stateOption: 'expanded',
    type: 'Record<string, boolean> | boolean',
  },
  {
    defaultValue: '',
    description: '',
    link: 'https://tanstack.com/table/v8/docs/api/features/filters',
    linkText: 'TanStack Table Filtering Docs',
    source: 'TanStack Table',
    stateOption: 'globalFilter',
    type: 'any',
  },
  {
    defaultValue: '[]',
    description: '',
    link: 'https://tanstack.com/table/v8/docs/api/features/grouping',
    linkText: 'TanStack Table Grouping Docs',
    source: 'TanStack Table',
    stateOption: 'grouping',
    type: 'Array<string>',
  },
  {
    defaultValue: "'md'",
    description: '',
    link: '',
    linkText: '',
    source: 'TanStack Table',
    stateOption: 'density',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
  },
  {
    defaultValue: 'false',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    stateOption: 'isFullScreen',
    type: 'boolean',
  },
  {
    defaultValue: 'false',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    stateOption: 'isLoading',
    type: 'boolean',
  },
  {
    defaultValue: 'false',
    description:
      'Shows progress bars and a spinner on the save buttons when true',
    link: '',
    linkText: '',
    source: 'MRT',
    stateOption: 'isSaving',
    type: 'boolean',
  },
  {
    defaultValue: '{ pageIndex: 0, pageSize: 10 }',
    description: '',
    link: 'https://tanstack.com/table/v8/docs/api/features/pagination',
    linkText: 'TanStack Table Pagination Docs',
    source: 'TanStack Table',
    stateOption: 'pagination',
    type: '{ pageIndex: number, pageSize: number } ',
  },
  {
    defaultValue: '{}',
    description: '',
    link: 'https://tanstack.com/table/v8/docs/api/features/row-selection',
    linkText: 'TanStack Table Row Selection Docs',
    source: 'TanStack Table',
    stateOption: 'rowSelection',
    type: 'Record<string, boolean>',
  },
  {
    defaultValue: 'false',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    stateOption: 'showAlertBanner',
    type: 'boolean',
  },
  {
    defaultValue: 'false',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    stateOption: 'showColumnFilters',
    type: 'boolean',
  },
  {
    defaultValue: 'false',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    stateOption: 'showGlobalFilter',
    type: 'boolean',
  },
  {
    defaultValue: 'false',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    stateOption: 'showProgressBars',
    type: 'boolean',
  },
  {
    defaultValue: 'false',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    stateOption: 'showSkeletons',
    type: 'boolean',
  },
  {
    defaultValue: 'false',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    stateOption: 'showToolbarDropZone',
    type: 'boolean',
  },
  {
    defaultValue: '[]',
    description: '',
    link: 'https://tanstack.com/table/v8/docs/api/features/sorting',
    linkText: 'TanStack Table Sorting Docs',
    source: 'TanStack Table',
    stateOption: 'sorting',
    type: 'Array<{ id: string, desc: boolean }>',
  },
];
