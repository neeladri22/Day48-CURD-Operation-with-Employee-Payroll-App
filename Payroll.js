// UC2 Update an Employee Payroll details
let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded',(event)=>{
    const name = document.querySelector('#name');
    //const textError = document.querySelector('.text-error');
    name.addEventListener('input',function(){
        if(name.value.length == 0){
            setTextValue('.text-error',"");
            // textError.textContent = "";
            return;
        }
        try{
            (new EmployeePayrollData()).name = name.value;
            setTextValue('.text-error',"");
             //textError.textContent = "";
        }
        catch(e){
            setTextValue('.text-error',e);
            // textError.textContent = e;
        }
    });

   const date = document.querySelector("#date");
   date.addEventListener('input' , function(){
       let startDate = getInputValueById('#day')+" "+getInputValueById('#month')+" "+ getInputValueById('#year');
       try{
           (new EmployeePayrollData()).startDate = new Date(Date.parse(startDate));
           setTextValue('.date-error', "");
       }
       catch(e){
           setTextValue('.date-error',e);
       }
   });

    const salary = document.querySelector("#salary");
    const output = document.querySelector(".salary-output");
    output.textContent = salary.value;
    setTextValue('.salary-output', salary.value);
    salary.addEventListener('input',function(){
        output.textContent = salary.value;
        checkForUpdate();
    });
});


const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if(!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

const setForm=() => {
    setValue('#name',employeePayrollObj._name);
    setSelectedValues('[name=profile]',employeePayrollObj._profilePic); 
    setSelectedValues ( '[name=gender]',employeePayrollObj._gender);
    setSelectedValues ( '[name-department]',employeePayrollObj._department);
    setValue('#salary',employeePayrollObj._note); 
    setValue('#notes',employeePayrollObj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue( '#month', date[1]);
    setValue('#year', date[2]); 
}

const setSelectedValues = (propertyValue,value) => {
    let allItems= document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked = true;
            }
        }
        else if (item.value === value)
        item.checked = true;
    });
}