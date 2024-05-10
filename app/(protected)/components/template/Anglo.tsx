// import React, { useEffect, useState } from 'react';
// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
// import { PDFViewer } from '@react-pdf/renderer';
// import { getInitialData } from '@/data/InitialData';
// import { ResumeSchema } from '@/schemas';
// import * as z from "zod"
// const styles = StyleSheet.create({
// 	page: {
// 		flexDirection: 'row',
// 	},
// 	section: {
// 		flexGrow: 1,
// 	},
// 	text: {
// 		color: "black",
// 	},
// });

// export const MyDocument = (object: z.infer<typeof ResumeSchema>) => (

	
// 	<Document>
// 	 <Page size="A4" style={styles.page}>
// 			<View style={styles.section}>
// 				<Text>{object?.bio}</Text>
// 			</View>
// 			<View style={styles.section}>
// 				<Text>We're inside a PDF!</Text>
// 			</View>
// 		</Page>
// 	</Document>
//   );

 const Anglo = () => {
	return(
	<>
	ciao
	</>

	)
}
export default Anglo

// const Test = () => {
// 	const [object, setObject] = useState<Partial<z.infer<typeof ResumeSchema>>>(); 

// 	useEffect(() => {
// 		const fetchPublicValues = async () => {
// 			try {
// 				const data = await getInitialData();
// 				if (data) {
// 				  // setObject(prevObject => ({
// 				  //   ...prevObject,
// 				  //   image: data.image ?? prevObject?.image
// 				  setObject(data)
// 				  // Imposta lo stato di object con i dati ottenuti
					
// 				}
// 				console.log(data)
			
// 			} catch (error) {
// 				console.error("Error connecting to db ", error);
// 			}
// 		};
	
// 		fetchPublicValues();
// 	}, []);
// 	return(
// <Document>
// 	 <Page size="A4" style={styles.page}>
// 			<View style={styles.section}>
// 				<Text>{object?.bio}</Text>
// 			</View>
// 			<View style={styles.section}>
// 				<Text>We're inside a PDF!</Text>
// 			</View>
// 		</Page>
// 	</Document>
// 		// <MyDocument object={object}/>
// 	)
// }
// export default Test
