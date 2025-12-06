import {  PDFDownloadLink } from '@react-pdf/renderer'
import React from 'react'
import Mypage from '../Mypage'

function DownlaodPDF() {
  return (
      <>
  

        <PDFDownloadLink document={<Mypage />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download now!'
      }
    </PDFDownloadLink>

 
      </>
  )
}

export default DownlaodPDF