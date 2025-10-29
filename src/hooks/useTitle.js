// src/hooks/useTitle.js
import { useEffect } from "react";

export default function useTitle(title) {
  useEffect(() => {
    document.title = `${title} | Exva`;
  }, [title]);
}
