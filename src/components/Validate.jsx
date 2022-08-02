import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getToken } from "../slices/authSlice";

function Validate() {
    let [params, ] = useSearchParams();
    let { loading, error } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!loading && error === null) {
            navigate("/profile");
        }
        // eslint-disable-next-line
    }, [loading]);

    useEffect(() => {
        let code = params.get('code');
        dispatch(getToken(code));
        // eslint-disable-next-line
    }, []); 

    return (
        <div className="container-validate">
            <div className="validate-message">{ error !== null ? error : 'Loading...' }</div>
            {error !== null && <Link to="/"><button className="login-button">Return to Login Page</button></Link>}    
        </div>
    )
}

export default Validate;