## A payment card display component and card validator for react native applications.

![](https://media.giphy.com/media/W2E0ld48bQXS96cBsd/giphy.gif)

## Installation

```
npm install --save react-native-payment-card
```

## Usage

```
<CreditCardInput
autoFocus
requiresName
requiresCVC
labelStyle={}
inputStyle={}
validColor={"black"}
invalidColor={"red"}
placeholderColor={"darkgray"}
onChange={this._onChange}
/>

//Note: The data entered in the card component is availaible in the onChange Method.
```

## Props

#

| Props              | Type             | Description                                                                           |
| ------------------ | ---------------- | ------------------------------------------------------------------------------------- |
| autoFocus          | PropTypes.bool   | Automatically sets focus on input field                                               |
| onChange           | PropTypes.func   | Returns a object with keys name,email,cvv,card number and its value that can be used. |
| placeholderColor   | PropTypes.string | Can be used to set color of input fields                                              |
| validColor         | PropTypes.string | Can be used to indicate colour of valid fields                                        |
| invalidColor       | PropTypes.string | Can be used to indicate colour of invalid fields                                      |
| labelStyle         | PropTypes.string | Can be used to style input labels                                                     |
| inputStyle         | PropTypes.string | Can be used to style input fields                                                     |
| requiresName       | PropTypes.bool   | Boolean to display name field                                                         |
| requiresCVC        | PropTypes.bool   | Boolean to display CVC field                                                          |
| requiresEmail      | PropTypes.bool   | Boolean to display emailfield                                                         |
| requiresPostalCode | PropTypes.bool   | Boolean to display postal code field                                                  |
