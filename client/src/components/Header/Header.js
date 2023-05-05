import React, { useState } from "react";
import { Link, NavLink, useHistory, withRouter } from "react-router-dom";
import { Avatar, Button, IconButton } from "@material-ui/core";
import "./Header.css";
import ClearIcon from "@material-ui/icons/Clear";
import NotesIcon from "@material-ui/icons/Notes";
import { useDispatch } from "react-redux";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const toggleClose=()=>{
    setToggle(false)
    
  }
  return (
    <div className="header">
      <div className="left__header">
        <Link to="/">
          <img className="logo" 
            src="./logo.png"
            alt=""
          />
          <h4>Detect Neoplasam</h4>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Header);
