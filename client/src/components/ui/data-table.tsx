import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Column {
  key: string;
  header: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  loading?: boolean;
  emptyMessage?: string;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  };
}

export function DataTable({
  columns,
  data,
  loading = false,
  emptyMessage = "Nenhum item encontrado",
  pagination,
}: DataTableProps) {
  if (loading) {
    return (
      <div className="metric-card rounded-lg p-6">
        <div className="text-center py-8">
          <div className="text-muted-foreground">Carregando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="metric-card rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-accent hover:bg-accent">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className="px-4 py-3 text-left text-sm font-medium text-foreground"
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="px-4 py-16 text-center"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-lg font-medium text-foreground mb-2">
                      {emptyMessage}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <TableRow
                  key={item.id || index}
                  className="table-row border-b border-border transition-colors hover:bg-accent/50"
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className="px-4 py-3 text-sm"
                    >
                      {column.render
                        ? column.render(item[column.key], item)
                        : item[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <div className="px-4 py-3 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando {Math.min(pagination.pageSize, data.length)} de{" "}
            {pagination.total} itens
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={
                pagination.page >= Math.ceil(pagination.total / pagination.pageSize)
              }
            >
              Próximo
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
