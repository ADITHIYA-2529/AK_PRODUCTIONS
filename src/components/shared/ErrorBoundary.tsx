import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled UI Error caught by ErrorBoundary:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white p-8 rounded-4xl border border-brand-border shadow-float">
            <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/25 mx-auto mb-4 flex items-center justify-center text-brand-gold text-2xl font-bold font-display">
              !
            </div>
            <h2 className="font-display text-2xl font-bold text-brand-heading mb-2">Something went wrong</h2>
            <p className="text-brand-body text-sm font-body font-light mb-6">
              We experienced a temporary error loading this section. Please refresh the page or return to Home.
            </p>
            <button
              onClick={() => window.location.assign('/')}
              className="btn-gold font-bold py-3 px-6 text-xs uppercase tracking-widest"
            >
              Return Home
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
