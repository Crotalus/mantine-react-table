import {
  memo,
  type CSSProperties,
  type DragEvent,
  type MouseEvent,
  type RefObject,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Skeleton, TableTd } from '@mantine/core';
import clsx from 'clsx';
import { MRT_EditCellTextInput } from '../inputs/MRT_EditCellTextInput';
import { MRT_CopyButton } from '../buttons/MRT_CopyButton';
import { MRT_TableBodyCellValue } from './MRT_TableBodyCellValue';
import {
  getIsFirstColumn,
  getIsFirstRightPinnedColumn,
  getIsLastColumn,
  getIsLastLeftPinnedColumn,
  getTotalRight,
  parseCSSVarId,
  parseFromValuesOrFunc,
} from '../column.utils';
import {
  type MRT_Cell,
  type MRT_TableInstance,
  type MRT_VirtualItem,
} from '../types';

import classes from './MRT_TableBodyCell.module.css';

interface Props<TData extends Record<string, any> = {}> {
  cell: MRT_Cell<TData>;
  isStriped?: boolean | 'odd' | 'even';
  measureElement?: (element: HTMLTableCellElement) => void;
  numRows?: number;
  rowIndex: number;
  rowRef: RefObject<HTMLTableRowElement>;
  table: MRT_TableInstance<TData>;
  virtualCell?: MRT_VirtualItem;
}

export const MRT_TableBodyCell = <TData extends Record<string, any> = {}>({
  cell,
  isStriped,
  measureElement,
  numRows,
  rowIndex,
  rowRef,
  table,
  virtualCell,
}: Props<TData>) => {
  const {
    getState,
    options: {
      createDisplayMode,
      editDisplayMode,
      enableClickToCopy,
      enableColumnOrdering,
      enableColumnVirtualization,
      enableEditing,
      enableGrouping,
      enableRowNumbers,
      layoutMode,
      mantineSkeletonProps,
      mantineTableBodyCellProps,
      rowNumberMode,
    },
    refs: { editInputRefs },
    setEditingCell,
    setHoveredColumn,
  } = table;
  const {
    creatingRow,
    density,
    draggingColumn,
    draggingRow,
    editingCell,
    editingRow,
    hoveredColumn,
    hoveredRow,
    isLoading,
    showSkeletons,
  } = getState();
  const { column, row } = cell;
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const arg = { cell, column, row, table };
  const tableCellProps = {
    ...parseFromValuesOrFunc(mantineTableBodyCellProps, arg),
    ...parseFromValuesOrFunc(columnDef.mantineTableBodyCellProps, arg),
  };

  const skeletonProps = parseFromValuesOrFunc(mantineSkeletonProps, arg);

  const [skeletonWidth, setSkeletonWidth] = useState(100);
  useEffect(() => {
    if ((!isLoading && !showSkeletons) || skeletonWidth !== 100) return;
    const size = column.getSize();
    setSkeletonWidth(
      columnDefType === 'display'
        ? size / 2
        : Math.round(Math.random() * (size - size / 3) + size / 3),
    );
  }, [isLoading, showSkeletons]);

  const widthStyles = useMemo(() => {
    const styles: CSSProperties = {
      minWidth: `max(calc(var(--col-${parseCSSVarId(column.id)}-size) * 1px), ${
        column.columnDef.minSize ?? 30
      }px)`,
      width: `calc(var(--col-${parseCSSVarId(column.id)}-size) * 1px)`,
    };

    if (layoutMode === 'grid') {
      styles.flex = `${column.getSize()} 0 auto`;
    }

    return styles;
  }, [column]);

  const draggingBorders = useMemo(() => {
    const isDraggingColumn = draggingColumn?.id === column.id;
    const isHoveredColumn = hoveredColumn?.id === column.id;
    const isDraggingRow = draggingRow?.id === row.id;
    const isHoveredRow = hoveredRow?.id === row.id;
    const isFirstColumn = getIsFirstColumn(column, table);
    const isLastColumn = getIsLastColumn(column, table);
    const isLastRow = rowIndex === numRows && numRows - 1;

    const borderStyle =
      isDraggingColumn || isDraggingRow
        ? '1px dashed var(--mantine-color-gray-7) !important'
        : isHoveredColumn || isHoveredRow
        ? '2px dashed var(--mantine-primary-color-filled) !important'
        : undefined;

    return borderStyle
      ? {
          borderLeft:
            isDraggingColumn ||
            isHoveredColumn ||
            ((isDraggingRow || isHoveredRow) && isFirstColumn)
              ? borderStyle
              : undefined,
          borderRight:
            isDraggingColumn ||
            isHoveredColumn ||
            ((isDraggingRow || isHoveredRow) && isLastColumn)
              ? borderStyle
              : undefined,
          borderBottom:
            isDraggingRow || isHoveredRow || isLastRow
              ? borderStyle
              : undefined,
          borderTop: isDraggingRow || isHoveredRow ? borderStyle : undefined,
        }
      : undefined;
  }, [draggingColumn, draggingRow, hoveredColumn, hoveredRow, rowIndex]);

  const isEditable =
    (parseFromValuesOrFunc(enableEditing, row) &&
      parseFromValuesOrFunc(columnDef.enableEditing, row)) !== false;

  const isEditing =
    isEditable &&
    !['modal', 'custom'].includes(editDisplayMode as string) &&
    (editDisplayMode === 'table' ||
      editingRow?.id === row.id ||
      editingCell?.id === cell.id) &&
    !row.getIsGrouped();

  const isCreating =
    isEditable && createDisplayMode === 'row' && creatingRow?.id === row.id;

  const handleDoubleClick = (event: MouseEvent<HTMLTableCellElement>) => {
    tableCellProps?.onDoubleClick?.(event);
    if (isEditable && editDisplayMode === 'cell') {
      setEditingCell(cell);
      setTimeout(() => {
        const textField = editInputRefs.current[cell.id];
        if (textField) {
          textField.focus();
          textField.select?.();
        }
      }, 100);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLTableCellElement>) => {
    tableCellProps?.onDragEnter?.(e);
    if (enableGrouping && hoveredColumn?.id === 'drop-zone') {
      setHoveredColumn(null);
    }
    if (enableColumnOrdering && draggingColumn) {
      setHoveredColumn(
        columnDef.enableColumnOrdering !== false ? column : null,
      );
    }
  };

  return (
    <TableTd
      data-index={virtualCell?.index}
      ref={(node: HTMLTableCellElement) => {
        if (node) {
          measureElement?.(node);
        }
      }}
      {...tableCellProps}
      __vars={{
        '--mrt-table-cell-justify': tableCellProps.align,
        '--mrt-table-cell-left':
          column.getIsPinned() === 'left'
            ? `${column.getStart('left')}`
            : undefined,
        '--mrt-table-cell-right':
          column.getIsPinned() === 'right'
            ? `${getTotalRight(table, column)}`
            : undefined,
        '--mrt-row-depth':
          column.id === 'mrt-row-expand' ? `${row.depth}` : undefined,
        ...tableCellProps.__vars,
      }}
      className={clsx(
        'mrt-table-body-cell',
        classes.root,
        isStriped || row.getIsSelected()
          ? classes['root-inherit-background-color']
          : classes['root-default-background'],
        layoutMode === 'grid' && classes['root-grid'],
        isEditable &&
          editDisplayMode === 'cell' &&
          classes['root-cursor-pointer'],
        isEditable &&
          ['table', 'cell'].includes(editDisplayMode ?? '') &&
          columnDefType !== 'display' &&
          classes['root-editable-hover'],
        enableColumnVirtualization && classes['root-virtualized'],
        column.getIsPinned() &&
          column.columnDef.columnDefType !== 'group' &&
          classes['root-pinned'],
        column.getIsPinned() &&
          column.columnDef.columnDefType !== 'group' &&
          !row.getIsSelected() &&
          classes['root-pinned-color'],
        draggingColumn?.id === column.id ||
          (table.getState().hoveredColumn?.id === column.id &&
            classes['root-opacity']),
        column.getIsPinned() &&
          column.columnDef.columnDefType !== 'group' &&
          classes['root-pinned'],
        column.getIsPinned() === 'left' && classes['root-pinned-left'],
        column.getIsPinned() === 'right' && classes['root-pinned-right'],
        getIsLastLeftPinnedColumn(table, column) &&
          classes['root-pinned-left-last'],
        getIsFirstRightPinnedColumn(column) &&
          classes['root-pinned-right-first'],
        column.id === 'mrt-row-expand' && classes['root-expand-depth'],
        columnDefType === 'data' && classes['root-data-col'],
        density === 'xs' && classes['root-nowrap'],
        draggingColumn?.id === column.id && classes['root-dragging'],
        tableCellProps?.className,
      )}
      style={(theme) => ({
        ...draggingBorders,
        ...widthStyles,
        ...parseFromValuesOrFunc(tableCellProps.style, theme),
      })}
      onDragEnter={handleDragEnter}
      onDoubleClick={handleDoubleClick}
    >
      <>
        {cell.getIsPlaceholder() ? (
          columnDef.PlaceholderCell?.({ cell, column, row, table }) ?? null
        ) : (isLoading || showSkeletons) &&
          [undefined, null].includes(cell.getValue<any>()) ? (
          <Skeleton height={20} width={skeletonWidth} {...skeletonProps} />
        ) : enableRowNumbers &&
          rowNumberMode === 'static' &&
          column.id === 'mrt-row-numbers' ? (
          rowIndex + 1
        ) : columnDefType === 'display' &&
          (['mrt-row-drag', 'mrt-row-expand', 'mrt-row-select'].includes(
            column.id,
          ) ||
            !row.getIsGrouped()) ? (
          columnDef.Cell?.({
            cell,
            column,
            row,
            rowRef,
            renderedCellValue: <>{cell.getValue()}</>,
            table,
          })
        ) : isCreating || isEditing ? (
          <MRT_EditCellTextInput cell={cell} table={table} />
        ) : (enableClickToCopy || columnDef.enableClickToCopy) &&
          columnDef.enableClickToCopy !== false ? (
          <MRT_CopyButton cell={cell} table={table}>
            <MRT_TableBodyCellValue cell={cell} table={table} />
          </MRT_CopyButton>
        ) : (
          <MRT_TableBodyCellValue cell={cell} table={table} />
        )}
      </>
      {cell.getIsGrouped() && !columnDef.GroupedCell && (
        <> ({row.subRows?.length})</>
      )}
    </TableTd>
  );
};

export const Memo_MRT_TableBodyCell = memo(
  MRT_TableBodyCell,
  (prev, next) => next.cell === prev.cell,
) as typeof MRT_TableBodyCell;
