'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface ImportResult {
  imported: number
  skipped: number
  invalid: { row: any; error: string }[]
}

export function CSVImporter({
  onImport,
  instanceId,
  userId,
}: {
  onImport: (file: File) => Promise<ImportResult>
  instanceId: string
  userId: string
}) {
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return

      const file = acceptedFiles[0]
      setUploading(true)
      setError(null)
      setResult(null)

      try {
        const importResult = await onImport(file)
        setResult(importResult)
      } catch (err: any) {
        setError(err.message || 'Import failed')
      } finally {
        setUploading(false)
      }
    },
    [onImport]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Contacts via CSV</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          {isDragActive ? (
            <p className="text-lg">Drop the CSV file here...</p>
          ) : (
            <>
              <p className="text-lg font-medium">Drag & drop a CSV file here</p>
              <p className="text-sm text-muted-foreground mt-2">
                or click to select a file
              </p>
            </>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="font-medium mb-2">CSV Format Requirements:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>File must have headers: phone, name, email (optional), tags (optional)</li>
            <li>Phone numbers must be in international format (e.g., +1234567890)</li>
            <li>Tags should be comma-separated if multiple</li>
          </ul>
        </div>

        {uploading && <Progress value={50} />}

        {result && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span>{result.imported} contacts imported successfully</span>
            </div>
            {result.skipped > 0 && (
              <div className="flex items-center gap-2 text-yellow-600">
                <AlertCircle className="h-5 w-5" />
                <span>{result.skipped} contacts skipped (duplicates)</span>
              </div>
            )}
            {result.invalid.length > 0 && (
              <div className="text-sm text-muted-foreground">
                <p>{result.invalid.length} rows had invalid data</p>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-destructive">
            <X className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}