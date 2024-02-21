import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';
import style from '../components/pharmacy/Form.module.css'
import { fetchLabs, updateLab } from '../store/thunk';

function UpdateLabs() {
    const updatedLab = useSelector((state) => state.labs.labs)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {id} = useParams()

    const [lab, setLab] = useState({
      labItemName: "",
      mainCategory: "",
      labItemCode: "",
      subCategory: "",
      price: "",
    })

    useEffect(() => {
      dispatch(fetchLabs());
    }, [dispatch])

    const findLab = updatedLab.find((item) => {
        return item._id === id
    })


    const [labItemName, setlabItemName] = useState(findLab.labItemName);
    const [mainCategory, setmainCategory] = useState(findLab.mainCategory);
    const [subCategory, setsubCategory] = useState(findLab.subCategory);
    const [labItemCode, setlabItemCode] = useState(findLab.labItemCode);
    const [price, setPrice] = useState(findLab.price);

    const handleSubmit = (event) => {
        event.preventDefault();

        const lab ={
            labItemName,
            mainCategory,
            subCategory,
            labItemCode,
            price
        };

        dispatch(updateLab(updatedLab))
    };

    const inputChangeHandler = (setter, e) => {
      setter(e.target.value)
    }

  return (
    <>
      <div className={style.dflex}>
        <form onSubmit={handleSubmit}>
          <div className={style.marginBottom}>
            <label htmlFor="labItemName" className={style.label}>
              Lab Item Name
            </label>
            <input
              type="text"
              className={style.input}
              id="labItemName"
              name="labItemName"
              value={labItemName}
              onChange={(e) => inputChangeHandler(setlabItemName, e)}
              placeholder="Type lab name here"
            />

            <select className={style.input} style={{width:'135px'}}>
              <option value="" disabled selected>
                Lab Type
              </option>
              <option value="MicroBiology">Micro Biology</option>
              <option value="ClinicalLab  ">Clinical Lab</option>
              <option value="ResearchLab">Research Lab</option>
              <option value="Hematology">Hematology</option>
            </select>
          </div>

          <div className={style.marginBottom}>
            <label htmlFor="mainCategory" className={style.label}>
              Main Category
            </label>
            <select className={style.input}
               id="mainCategory"
               name="mainCategory"
               value={mainCategory}
               onChange={(e) => inputChangeHandler(setMainCategory, e)}>
              <option value="" disabled selected>
                X-ray
              </option>
              <option value="computedTomographyC">computed tomography</option>
              <option value="fluoroscopy ">fluoroscopy</option>
              <option value="mammography">mammography</option>
              <option value="angiography">angiography</option>
            </select>
          </div>

          <div className={style.marginBottom}>
            <label htmlFor="subCategory" className={style.label}>
              Unit of Pricing
            </label>
            <input
              type="text"
              className={style.input}
              id="subCategory"
              name="subCategory"
              value={subCategory}
              onChange={(e) => inputChangeHandler(setsubCategory, e)}
              placeholder="Head and Skull"
            />
          </div>

          <div className={style.marginBottom}>
            <label htmlFor="labItemCode" className={style.label}>
              lab Item Code
            </label>
            <input
              type="text"
              className={style.input}
              id="labItemCode"
              name="labItemCode"
              value={labItemCode}
              onChange={(e) => inputChangeHandler(setlabItemCode, e)}
              placeholder="Aoc123FH"
            />
          </div>

          <div className={style.marginBottom}>
            <label htmlFor="Price" className={style.label}>
              Price:
            </label>
            <input
              type="text"
              className={style.input}
              id="price"
              name="price"
              value={price}
              onChange={(e) => inputChangeHandler(setPrice, e)}
              placeholder="2.02"
            />

            <button className={style.addButton} type="Submit">
              UPDATE
            </button>
          </div>
        </form>

      </div>

    </>
  )
}

export default UpdateLabs