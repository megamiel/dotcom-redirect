import React from 'react'

const FormComplete = ({user}) => {
  sessionStorage.removeItem("currentExamCategory")
  sessionStorage.removeItem("currentExamName");
  sessionStorage.removeItem("currentExamQuestion")
  sessionStorage.removeItem("currentExamNum")
  return (
    <div>リザルトフォーム送信完了</div>
  )
}

export default FormComplete