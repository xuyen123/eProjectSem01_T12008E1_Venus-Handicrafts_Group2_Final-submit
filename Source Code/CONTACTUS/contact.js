
 function myFunction() {
    var y = document.getElementById("open");
    if(y.style.width === "100%"){
        y.style.width = "0%";
      
    } 
    else{
      y.style.width = "100%";
      
    }
  }
  function myChange(x){
    x.classList.toggle("change");
  }
      
  /*FORM IN*/
function FormIn() {
 //mail
 e=dk.mail.value;
 em= /^\w+[@]\w+[.]\w+([.]\w)?$/;
  if(!em.test(e)){
   document.getElementById("eml").style.border = " 2px solid red";
   document.getElementById("mode").style.color = " red";
      text = "Email address is invalid";  
      document.getElementById("mode").innerHTML = text;
       return false;
  }
  else {
   document.getElementById("eml").style.border = " 2px solid green";
   text = "";
}
document.getElementById("mode").innerHTML = text;

    //Password
    p=dk.pass.value;
    pas= /^\w{6,12}$/;
   if(!pas.test(p)){
    document.getElementById("pa").style.border = " 2px solid red";
    document.getElementById("demo").style.color = " red";
      text1 = "Password field is required. Password must be [6-12] character";
       document.getElementById("demo").innerHTML = text1;
      return false; 
   }
    else {
    text1 = "";
    document.getElementById("pa").style.border = " 2px solid green";
    document.getElementById("demo").innerHTML = text1;
    return true;
}
}
  /*FORM UP*/
  function FormUp() {
    //mail
    e=signup.emai.value;
    em= /^\w+[@]\w+[.]\w+([.]\w)?$/;
     if(!em.test(e)){
      document.getElementById("ma").style.border = " 2px solid red";
      document.getElementById("up").style.color = " red";
         text1 = "Email address is invalid";  
         document.getElementById("up").innerHTML = text1;
          return false;
     }
     else {
      document.getElementById("ma").style.border = " 2px solid green";
      text3 = "";
   }
   document.getElementById("up").innerHTML = text3;
  }
    /*FORM CONTACT*/
function FormContact() {

  //Username
  n=dk2.ten.value;
  na= /^\w+$/;
 if(!na.test(n)){
  document.getElementById("textname").style.border = " 2px solid red";
  document.getElementById("demoarrange").style.color = " red";
   textarrange = "Name field is required";  
   document.getElementById("demoarrange").innerHTML = textarrange;
   return false;
 }

 else {
  textarrange = "";
  document.getElementById("textname").style.border = " 2px solid green";

}
document.getElementById("demoarrange").innerHTML = textarrange;

    //mail
    e1=dk2.emaila.value;
    em1= /^\w+[@]\w+[.]\w+([.]\w)?$/;
     if(!em1.test(e1)){
      document.getElementById("textemail").style.border = " 2px solid red";
      document.getElementById("demoarrange1").style.color = " red";
      text5 = "Email address is invalid";  
      document.getElementById("demoarrange1").innerHTML = text5;
      return false;
      
     }
     else {
      document.getElementById("textemail").style.border = " 2px solid green";
      text4 = "";
     
     }
   document.getElementById("demoarrange1").innerHTML = text4;
     //Message
  mes=dk2.M1.value;
  messa= /^\w+$/;
 if(!messa.test(mes)){
  document.getElementById("me").style.border = " 2px solid red";
  document.getElementById("demoarrange2").style.color = " red";
   textarrange2 = "Message field is required";  
   document.getElementById("demoarrange2").innerHTML = textarrange2;
   return false;
 }

 else {
  textarrange2 = "";
  document.getElementById("me").style.border = " 2px solid green";

}
document.getElementById("demoarrange2").innerHTML = textarrange2;
}
// FORM REGISTER VALIDATE
// Đối tượng `Validator`
function Validator(options) {
  function getParent(element, selector) {
      while (element.parentElement) {
          if (element.parentElement.matches(selector)) {
              return element.parentElement;
          }
          element = element.parentElement;
      }
  }

  var selectorRules = {};

  // Hàm thực hiện validate
  function validate(inputElement, rule) {
      var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
      var errorMessage;

      // Lấy ra các rules của selector
      var rules = selectorRules[rule.selector];
      
      // Lặp qua từng rule & kiểm tra
      // Nếu có lỗi thì dừng việc kiểm
      for (var i = 0; i < rules.length; ++i) {
          switch (inputElement.type) {
              case 'radio':
              case 'checkbox':
                  errorMessage = rules[i](
                      formElement.querySelector(rule.selector + ':checked')
                  );
                  break;
              default:
                  errorMessage = rules[i](inputElement.value);
          }
          if (errorMessage) break;
      }
      
      if (errorMessage) {
          errorElement.innerText = errorMessage;
          getParent(inputElement, options.formGroupSelector).classList.add('invalid');
      } else {
          errorElement.innerText = '';
          getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
      }

      return !errorMessage;
  }

  // Lấy element của form cần validate
  var formElement = document.querySelector(options.form);
  if (formElement) {
      // Khi submit form
      formElement.onsubmit = function (e) {
          e.preventDefault();

          var isFormValid = true;

          // Lặp qua từng rules và validate
          options.rules.forEach(function (rule) {
              var inputElement = formElement.querySelector(rule.selector);
              var isValid = validate(inputElement, rule);
              if (!isValid) {
                  isFormValid = false;
              }
          });

          if (isFormValid) {
              // Trường hợp submit với javascript
              if (typeof options.onSubmit === 'function') {
                  var enableInputs = formElement.querySelectorAll('[name]');
                  var formValues = Array.from(enableInputs).reduce(function (values, input) {
                      
                      switch(input.type) {
                          case 'radio':
                              values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                              break;
                          case 'checkbox':
                              if (!input.matches(':checked')) {
                                  values[input.name] = '';
                                  return values;
                              }
                              if (!Array.isArray(values[input.name])) {
                                  values[input.name] = [];
                              }
                              values[input.name].push(input.value);
                              break;
                          case 'file':
                              values[input.name] = input.files;
                              break;
                          default:
                              values[input.name] = input.value;
                      }

                      return values;
                  }, {});
                  options.onSubmit(formValues);
              }
              // Trường hợp submit với hành vi mặc định
              else {
                  formElement.submit();
              }
          }
      }

      // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
      options.rules.forEach(function (rule) {

          // Lưu lại các rules cho mỗi input
          if (Array.isArray(selectorRules[rule.selector])) {
              selectorRules[rule.selector].push(rule.test);
          } else {
              selectorRules[rule.selector] = [rule.test];
          }

          var inputElements = formElement.querySelectorAll(rule.selector);

          Array.from(inputElements).forEach(function (inputElement) {
             // Xử lý trường hợp blur khỏi input
              inputElement.onblur = function () {
                  validate(inputElement, rule);
              }

              // Xử lý mỗi khi người dùng nhập vào input
              inputElement.oninput = function () {
                  var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                  errorElement.innerText = '';
                  getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
              } 
          });
      });
  }

}



// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired = function (selector, message) {
  return {
      selector: selector,
      test: function (value) {
          return value ? undefined :  message || 'Please enter thí field'
      }
  };
}

Validator.isEmail = function (selector, message) {
  return {
      selector: selector,
      test: function (value) {
          var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return regex.test(value) ? undefined :  message || 'This field must be email';
      }
  };
}

Validator.minLength = function (selector, min, message) {
  return {
      selector: selector,
      test: function (value) {
          return value.length >= min ? undefined :  message || `Password must be entered at least ${min} character`;
      }
  };
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
      selector: selector,
      test: function (value) {
          return value === getConfirmValue() ? undefined : message || 'Input value is incorrect';
      }
  }
}

 