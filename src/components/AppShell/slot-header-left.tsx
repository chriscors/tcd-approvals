// import Link from "next/link";

import AppLogo from "../AppLogo";

/**
 * DO NOT REMOVE / RENAME THIS FILE
 *
 * You may CUSTOMIZE the content of this file, but the ProofKit CLI expects this file to exist and
 * may use it to inject content for other components.
 *
 * If you don't want it to be used, you may return null or an empty fragment
 */
export function SlotHeaderLeft() {
  return (
    <>
      {/* <Link href="/" style={{ display: "inline-flex", alignItems: "center" }}> */}
      <AppLogo />
      {/* </Link> */}
    </>
  );
}

export default SlotHeaderLeft;
