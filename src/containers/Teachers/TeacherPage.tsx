import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

import { useGetTeachersQuery } from '@/api/_teacherApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IconPlus } from '@/icons'
import { openModal } from '@/redux/slices/modal.slice'
import { useAppDispatch } from '@/redux/store'
import { Teacher } from '@/types/teacher.type'

import Actions from './Actions'

const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: 'code',
    header: 'Code',
    cell: ({ row }) => <p className="capitalize">{row.getValue('code')}</p>,
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Full Name
      </Button>
    ),
    cell: ({ row }) => {
      const { firstName, lastName } = row.original
      return (
        <p>
          {firstName} {lastName}
        </p>
      )
    },
  },
  {
    accessorKey: 'phone_number',
    header: () => <h1>Phone Number</h1>,
    cell: ({ row }) => <p>{row.getValue('phone_number')}</p>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <p>{row.getValue('email')}</p>,
  },
  {
    accessorKey: 'gender',
    header: () => <h1>Gender</h1>,
    cell: ({ row }) => {
      const genderValue = row.getValue('gender')
      return <p> {genderValue ? 'Female' : 'Male'} </p>
    },
  },
  {
    accessorKey: 'subjects',
    header: () => <h1>Subjects</h1>,
    cell: ({ row }) => (
      <p>
        {row.getValue('subjects')
          ? 'No Subject Assigned'
          : row.getValue('subjects')}
      </p>
    ),
  },
  {
    accessorKey: 'classes',
    header: () => <h1>Classes</h1>,
    cell: ({ row }) => (
      <p className="font-medium">
        {row.getValue('classes')
          ? 'No Class Assigned'
          : row.getValue('classes')}
      </p>
    ),
  },
  {
    id: 'actions',
    header: () => <h1>Actions</h1>,
    cell: ({ row }) => {
      const item = row.original
      return <Actions item={item} />
    },
  },
]

export const TeacherPage = () => {
  const dispatch = useAppDispatch()

  const { data: teachers, isLoading } = useGetTeachersQuery()

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: teachers?.data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center py-4">
        <Button
          className="gap-2"
          onClick={() =>
            dispatch(openModal({ name: 'teacher', type: 'create' }))
          }
        >
          <IconPlus />
          Add Teacher
        </Button>
        <Input
          placeholder="Filter name..."
          value={
            (table.getColumn('fullName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('fullName')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
