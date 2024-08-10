import React from 'react'
import { AP, FE, SC } from '../../../exam/Consts';
import FeGrade from './FeGrade';
import ApGrade from './ApGrade';
import ScGrade from './ScGrade';
import "./Grade.css"

const Grade = ({results,examCategory}) => {
  const gradeMap={};
  gradeMap[FE]=<FeGrade results={results}/>
  gradeMap[AP]=<ApGrade results={results}/>
  gradeMap[SC]=<ScGrade results={results}/>
  return gradeMap[examCategory];
}

export default Grade