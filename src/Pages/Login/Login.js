import axios from "axios";
import { Button } from "bootstrap";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css"

const validateEmail = email => {
    if (!email) return "Required";
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) ? "" : "Invalid email"
};

const validatePassword = password => {
    if (!password) return "Required";
    if (password.length < 8) return "At least 8 characters";
};

const LoginPage = ({message}) => {

    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const errors = {
        email: validateEmail(values.email),
        password: validatePassword(values.password)
    };

    const [touched, setTouched] = useState({
        email: false,
        password: false
    });

    const handleInputBlur = evt => {
        setTouched({
            ...touched,
            [evt.target.name]: true
        });
    };

    const handleInputChange = evt => {
        setValues({
            ...values,
            [evt.target.name]: evt.target.value
        })
    };

    const isInvalidForm = errors.email || errors.password;

    const [showLoginSuccess, setShowLoginSucess] = useState(false);

    const navigate = useNavigate();

    const handleOnSubmit = () => {
        axios({
            method: "GET",
            url: "https://60dff0ba6b689e001788c858.mockapi.io/tokens",
        }).then(response => {
            setShowLoginSucess(true);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            setTimeout(() => {
                window.location.reload()
            },100);
            navigate("/profile");
        })
    };

    return (
        <div>
            {<h3>{message}</h3>}
            <Form>
                <input
                    type={"email"}
                    name="email"
                    className="form--input"
                    placeholder={"Email"}
                    autoComplete={"on"}
                    value={values.email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                ></input>
                {touched.email && <div className="input--error">{errors.email}</div>}

                <input
                    type={"password"}
                    name="password"
                    className="form--input"
                    placeholder={"Password"}
                    autoComplete={"on"}
                    value={values.password}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                ></input>
                {touched.password && <div className="input--error">{errors.password}</div>}

                <div 
                disabled={isInvalidForm} 
                type="submit"
                className="btn btn--submit"
                onClick={handleOnSubmit}
                >
                    Submit
                </div>
                {showLoginSuccess && <div className="login-success">Login success</div>}
            </Form>
        </div>
    );
};

export default LoginPage;