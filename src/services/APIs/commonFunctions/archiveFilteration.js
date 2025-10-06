

export function archiveProductsFilteration(data,isUser)
{
    console.log(data);
    isUser?
data=data.filter((item)=>item.categoryName.includes("##ARCHIVE")===false)
:data.map((item)=>{
    let isInclude =item.categoryName.includes("##ARCHIVE")
 item.categoryName =  isInclude?item.categoryName.split("##ARCHIVE")[0]:item.categoryName} );



return data

}
export function archiveCategoryFilteration(data,filterCategAsAdmin)
{
if(filterCategAsAdmin){
console.log(! Array.isArray(data) );

    if(! Array.isArray(data)){ 
         let isInclude =data.name.includes("##ARCHIVE")
 data.name =  isInclude?data.name.split("##ARCHIVE")[0]:data.name;
}
 
else
{
   data.map((item)=>{
    let isInclude =item.name.includes("##ARCHIVE")
 item.name =  isInclude?item.name.split("##ARCHIVE")[0]:item.name} );
}

    
}
else
{
        if(! Array.isArray(data)){ 
                 let isInclude =data.name.includes("##ARCHIVE")
 data.name =  isInclude?data.name.split("##ARCHIVE")[0]:data.name;

        }else
        {

            data=data.filter((item)=>item.name.includes("##ARCHIVE")===false) 
        }
}
 
return data;

}
