import { useRouteError } from "react-router-dom"

function Error() {

    const error = useRouteError()

return (
<>
<header>

</header>
<main>
<h3>Error: {error?.message || "NO ERROR MESSAGE" }</h3>
<h3>Error: {error?.status || "NO ERROR STATUS" }</h3>
<h3>Error: {error?.statusText || "NO ERROR STATUS-TEXT" }</h3>
<h3>Error: {error?.type || "NO ERROR TYPE" }</h3>
</main>
</>
)}

export default Error
