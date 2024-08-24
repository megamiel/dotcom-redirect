import React from 'react'
import SIKEN_DOTCOM_LINK from '../../../../SikenDotcomLink'
import { SC } from '../../../exam/Consts'
import { FORM } from '../../../PageModes'

const ScLoanDetail = ({exam,i,setPageMode}) => {
  const examClickHandle=()=>{
    sessionStorage.setItem("currentExamCategory",SC)
    sessionStorage.setItem("currentExamName",exam.name);
    sessionStorage.setItem("currentExamQuestion",1)
    sessionStorage.setItem("currentExamNum",exam.num%exam.pm1Len+1)
    setPageMode(FORM)
  }

  return (
    <div key={i}><a className='redirect' href={`${SIKEN_DOTCOM_LINK}${exam.link}`} target="_blank" onClick={examClickHandle}>{exam.name} 午後{<span className="scNumber">{exam.num<exam.pm1Len?"Ⅰ":"Ⅱ"}</span>}問{exam.num%exam.pm1Len+1}</a></div>
  )
}

export default ScLoanDetail