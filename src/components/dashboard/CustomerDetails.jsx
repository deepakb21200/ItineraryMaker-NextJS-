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



import { Document, Image, Page, PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer';


 import { useParams } from "react-router-dom";
import { supabase } from "../../supabase-client";  
import { useEffect, useState } from 'react';
 


//   async function combine(){
//   const { data, error } = await supabase.from("form_1").select("*");

      
//   }


















 

const styleObj = StyleSheet.create({
  content: {
    // backgroundColor: 'red',
    fontSize: 40,
    textAlign:"center"
  },
  viewContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // unitless
  },
  heading:{
    fontSize:"25px",
  }
});


 

function CustomerDetails({data}) {
   const { id } = useParams();   // URL se ID milegi
  const [data1, setData1] = useState(null);
 

async function getdetails() {
const { data, error } = await supabase.from("form_1").select("*").eq("id", id).single();     
console.log("datasss2", data);

setData1(data)

}
  
  useEffect(()=>{
getdetails()
  },[])


    // ✅ Conditional rendering to avoid PDFViewer errors
  if (!data1) return <div>Loading...</div>;
  return (
    // <Document>
    //   <Page size="A4">
    //     <Text fixed>Invento Apps</Text>
    //     <View style={styleObj.viewContent}>
 
    //       <Text style={styleObj.content}>Query Related Information</Text>
    //        <Text style={styleObj.content}>{data1.querysource} || N.A</Text>
    //       <Text style={styleObj.content}>{data1.referenceid} || N.A</Text>

    //     </View>


    //        <View style={styleObj.viewContent}>
 
    //       <Text style={styleObj.content}>Travel Information</Text>
    //        <Text style={styleObj.content}>{data1.destination} || N.A</Text>
    //       <Text style={styleObj.content}>{data1.startDate} || N.A</Text>
    //       <Text style={styleObj.content}>{data1.noOfNights} || N.A</Text>
    //       <Text style={styleObj.content}>{data1.noOFAdults} || N.A</Text>

    //     </View>


    //        <View style={styleObj.viewContent}>
 
    //       <Text style={styleObj.content}>User Contact Details</Text>
    //        <Text style={styleObj.content}>{data1.userName} || N.A</Text>
    //       <Text style={styleObj.content}>{data1.userNumber} || N.A</Text>

    //     </View>


    //       <View style={styleObj.viewContent}>
 
    //       <Text style={styleObj.content}>Additional  Details</Text>
    //        <Text style={styleObj.content}>{data1.Comments} || N.A</Text>
  

    //     </View>
   
   
          
    //   </Page>
    // </Document>

<PDFViewer style={{width:"100%", height:"100vh"}}>
    <Document>
      <Page size="A4">
        <Text fixed style={{textAlign:"center"}}>Invento Apps</Text>

        <View style={styleObj.viewContent}>
          <Text style={styleObj.content}>Query Related Information</Text>
          <Text style={styleObj.heading}>{data1?.querysource || "N.A"}</Text>
          <Text style={styleObj.heading}>{data1?.referenceid || "N.A"}</Text>
        </View>

        <View style={styleObj.viewContent} break>
          <Text style={styleObj.heading}>Travel Information</Text>
          <Text style={styleObj.heading}>{data1?.destination || "N.A"}</Text>
          <Text style={styleObj.heading}>{data1?.startDate || "N.A"}</Text>
          <Text style={styleObj.heading}>{data1?.noOfNights || "N.A"}</Text>
          <Text style={styleObj.heading}>{data1?.noOFAdults || "N.A"}</Text>
        </View>

        <View style={styleObj.viewContent} break>
          <Text style={styleObj.content}>User Contact Details</Text>
          <Text style={styleObj.heading}>{data1?.userName || "N.A"}</Text>
          <Text style={styleObj.heading}>{data1?.userNumber || "N.A"}</Text>
        </View>

        <View style={styleObj.viewContent} break>
          <Text style={styleObj.content}>Additional Details</Text>
          <Text style={styleObj.heading}>{data1?.Comments || "N.A"}</Text>
        </View>
      </Page>
    </Document>
</PDFViewer> 
  );
}

export default CustomerDetails;
