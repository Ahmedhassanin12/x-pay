"use client"
const CopyButton = ({ text }: { text: string }) => {
  return (
    <button
      type="button"
      onClick={() => navigator.clipboard.writeText(text)}
      className="btn btn-success"
    >
      Copy Link
    </button>
  )
}

export default CopyButton
