// import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
 
// function Mypage() {
 
//     let styleObj = StyleSheet.create({
//         // change text
//         content:{
//             backgroundColor:'red',
//             fontSize:'40px'
//         },

//         viewContent:{
//           display:"flex",
//           flexDirection:"column",
//           justifyContent:"center",
//           alignItems:"center",
//           padding:"20"
//         }
//     })
//   return (
 
//     <Document>
// <Page size={'A4'}>
//        <Text fixed>Header</Text> 
//  <View style={styleObj.viewContent}>

//     <Image  src="../../public/bmw.jpg" style={{ width: 200, marginTop: 20 }} />
//     <Text style={styleObj.content}>ROCKSTAR</Text>
//  </View>

// <Text break>ROCKSTAR</Text>
// <Text break>ROCKSTAR</Text>
// <Text break>ROCKSTAR</Text>
// <Text break>ROCKSTAR</Text>
// </Page>

// </Document>

 
 
 
//   )
// }

// export default Mypage



import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

const styleObj = StyleSheet.create({
  content: {
    backgroundColor: 'red',
    fontSize: 40,
  },
  viewContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // unitless
  },
});

function Mypage() {
  return (
    <Document>
      <Page size="A4">
        <Text fixed>Header</Text>
        <View style={styleObj.viewContent}>
          <Image src="/bmw.jpg" style={{ width: 200, marginTop: 20 }} />
          <Text style={styleObj.content}>ROCKSTAR</Text>
        </View>
        <Text break>ROCKSTAR</Text>
        <Text break>ROCKSTAR</Text>
        <Text break>ROCKSTAR</Text>
        <Text break>ROCKSTAR</Text>
         <Text >ROHIT</Text>
      </Page>
    </Document>
  );
}

export default Mypage;
