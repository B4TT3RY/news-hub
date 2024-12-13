// sse.ts

interface SSEOptions {
  url: string;
  messageHandler: (event: MessageEvent) => void;
  errorHandler: (event: Event) => void;
}

function createSSE(options: SSEOptions): EventSource {
  const eventSource = new EventSource(options.url);
  eventSource.onmessage = options.messageHandler;
  eventSource.onerror = options.errorHandler;
  return eventSource;
}

export default createSSE;
