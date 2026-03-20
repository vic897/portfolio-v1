'use client'
import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="ml-auto inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
      style={{
        background: "linear-gradient(135deg, rgba(45,125,255,1), rgba(100,210,255,0.95))",
        boxShadow: "0 16px 45px rgba(45,125,255,0.25)",
      }}
    >
      {pending ? "Sending..." : "Send message"}
      {!pending && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M4 12l16-8-6 16-2-6-8-2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}