import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoEllipsisVertical } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import style from "./ellipsis.module.css";
import { deleteDrug } from "../../store/thunk";
import { toast } from "react-toastify"
import { useNavigate } from "react-router";


const Ellipsis = ({drugId}) => {
  const {drug} = useSelector((state) => state.drugs);

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleView = (id) => {
    navigate(`/fetchdrug/${id}`)
  }

  const handleUpdate = (id) => {
    navigate(`/updatedrugs/${id}`)
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this drug?")
    if (confirmDelete) {
      dispatch(deleteDrug(drugId))
      toast.success("Deleted successfully!")
    } else {
      toast.error('Not deleted')
    }
  } 

useEffect(() => {
  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target) && event.target !== buttonRef.current) {
      setShowMenu(false);
    }
  };

  document.addEventListener('mousedown', handleOutsideClick);

  return () => {
    document.removeEventListener('mousedown', handleOutsideClick);
  };
}, []);

 const toggleMenu = () => {
  setShowMenu((prev) => !prev) }

  return (
    <div className={style.btns_container}>
      <button onClick={toggleMenu} ref={buttonRef}>
        <IoEllipsisVertical />
      </button>
      {showMenu && (
        <div ref={menuRef} className={style.menu_btns}>
          <button onClick={() => handleView(drugId)}><MdOutlineRemoveRedEye /> View</button>
          <button onClick={() => handleUpdate(drugId)}><FaRegEdit /> Edit</button>
          <button onClick={handleDelete}><RiDeleteBin6Line /> Delete</button>
        </div>
      )}
    </div>
  );
};

export default Ellipsis;
