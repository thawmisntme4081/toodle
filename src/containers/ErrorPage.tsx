import { useRouter } from '@tanstack/react-router'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { IconAlertTriangle } from '@/icons'

type Props = {
  error: Error
}

const ErrorPage = ({ error }: Props) => {
  const router = useRouter()

  return (
    <div className="mt-4 p-4 bg-violet-100">
      <Alert variant="destructive">
        <IconAlertTriangle className="size-4" />
        <AlertTitle>Oops! Something went wrong</AlertTitle>
      </Alert>

      <div className="mt-4 space-y-4">
        <Button
          onClick={() => {
            router.invalidate()
          }}
        >
          Try again
        </Button>
        {process.env.NODE_ENV !== 'production' && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="error-details">
              <AccordionTrigger>View error details</AccordionTrigger>
              <AccordionContent>
                <div className="rounded-md bg-muted p-4">
                  <h3 className="mb-2 font-semibold">Error Message:</h3>
                  <p className="mb-4 text-sm">{error.message}</p>
                  <h3 className="mb-2 font-semibold">Stack Trace:</h3>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs">
                    {error.stack}
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </div>
  )
}

export default ErrorPage
