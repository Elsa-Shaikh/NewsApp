// converted class based component into function based component
import spinner from "./spinner.gif";
const Loading = ()=> { 
    return (
        <div className='text-center'>
        <img src={spinner} alt="Loading..." className='my-3' />           
        </div>
    )
}
export default Loading