import { useRef, useEffect } from "react";
// import { useDebounce } from "rooks";
function useChatScroll(deps = []) {
  const ref = useRef();
  // useEffect(() => {
  //   console.log("chat scroll", ref);
  //   if (ref.current) {
  //     // setTimeout(() => {
  //     if (ref.current) {
  //       setTimeout(() => {
  //         ref.current.scrollTop = ref.current.scrollHeight;
  //       }, 500);
  //     }
  //     // }, 20);
  //   }
  // }, [...deps]);
  useEffect(() => {
    if (ref.current) {
      console.log("chat scroll", ref);
      const ele = ref.current;
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          console.log("update scroll top");
          entry.target.scrollTop = entry.target.scrollHeight;
        }
      });

      resizeObserver.observe(ele);
    }
  }, []);
  return ref;
}

export default useChatScroll;
