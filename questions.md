# React Fundamentals Q&A

## 1. Component vs PureComponent

- **Component**: Crated from React's "Component" class, whenever its state or props changes, the component re-renders (no shallow comparison).
- **PureComponent**: A Pure Component doesn't always re-render since the `shouldComponentUpdate` (lifecycle method) makes a shallow comparison between prev state/props and
  current state/props.
- **Break Example**: Using `PureComponent` can lead to issues if the component relies on deep object comparison. For example mutating an object's properties directly
  and then setting the state with that "new" object will not trigger a re-render since its shallowly compared and `shouldComponentUpdate` return false, so the new property of the object will not be displayed in the UI

## 2. Context + ShouldComponentUpdate

- **Issue**: A component using `shouldComponentUpdate()` might not re-render in response to context changes because it checks its own props/state but not the context's props/state. So if the value of the state in the context changes but the props and state of the component itself stays the same, the component will not update. This can lead to inconsistency in the UI.

## 3. Passing Information to Parent

1. **Lifting State/Callbacks**: Passing a function which sets state in the parent donw as props to the child component and executing it in the child component.
2. **Context API/State Management tool**: Sending a callback function through context and executing it in the child (most of the time the context is not the direct parent of the component). If using state management like Redux, executing a reducer function through an action in the child component which changes the state in the store.
3. **Refs/Foreward Ref**: Creating a ref in the parent component and sending it down to the child component where it is used. The child compoent has to be wrapped with `forwardRef` method.

## 4. Preventing Re-rendering

1. **React.memo()**: Higher order component that wraps a component and memoizes it. It performs a shallow comparison of the component's props so if they didn't change (and they are not an object/function), the component won't re-render
2. **shouldComponentUpdate()**: In class components, to control updates, you can return false and it will prevent the component from re-rendering.

## 5. Fragments in React

- **Purpose**: Whenever returning JSX in the component, you need to return 1 element, so if you don't want to wrap everything with an HTML element like div, you can wrap it with fragements `<> </>`.
- **Break Example**: It can mostly break your app in terms of css and selecting elements. For example trying to select the direct children wrapped in a fragment.

```css
ul > li {
  /* CSS properties */
}
 <ul>
      <>
        <li>Item 1</li>
        <li>Item 2</li>
      </>
      <li>Item 3</li>
    </ul>
```

## 6. Higher-Order Component (HOC) Examples

1. **WithAuthentication**: Adds authentication logic.

```
const withAuthentication = (WrappedComponent) => {
  return function(props) {
    const isAuthenticated = true/false
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    return <WrappedComponent {...props} />;
  };
};
```

2. **WithLogging**: Adds logging functionality.

```
const withLogging = (WrappedComponent) => {
  return function(props) {
    useEffect(() => {
      console.log(`I mounted`);
      return () => {
        console.log(`I unmounted`);
      };
    }, []);

    return <WrappedComponent {...props} />;
  };
};

```

3. **WithTheme**: Injects theming/styling props.

```
const theme = {
  mode: 'dark',
  color: '#fff',
};

const withTheme = (WrappedComponent, theme) => {
  return function(props) {
    return <WrappedComponent {...props} theme={theme} />
    };
};

export default withTheme;

```

## 7. Handling Exceptions

- **Promises**: Use `.catch()`, usually chained at the end of the promise chain. If there is any error throught the promise chain, the error is sent to the `.catch()`.
- **Callbacks**: The first parameter of the callback is usally an error, manually check if error is true, throw new Error. Mainly handles operational errors. Uncaught execptions should be handleded with try/catch
- **Async/Await**: Use `try/catch` blocks. Can handle both operational and programming errors. Any error that occurs in an await statement is caught in the catch block,

## 8. setState in React

- **Arguments**: It takes 2 arguments, an object with the state and value that you want to change and an optional callback function that will be executed after the state is updated and the component is re-rendered.
- **Async Nature**: It is asynchronous for performance reasons, it batches all the state updates together whenever the `setState` function is executed and updates all of them in a single update.

## 9. Migrating Class to Function Component

1. Convert Class to Function
2. Replace state with `useState` hooks.
3. Replace lifecycle methods with `useEffect` hooks.
4. Convert methods to functions.
5. Remove the `this` keyword from `this.props`, `this.state` and `this.myMethod`.
6. Remove `render` and `constructor` methods

## 10. Styling Components

- Inline styling using `style` attribute.
- CSS stylesheets and `className/id`.
- CSS modules with class names and `style` object.
- Styled-components or CSS libraries (Bootsrap, MUI).

## 11. Rendering HTML String from Server

- Use `dangerouslySetInnerHTML`:

```
function RenderHTML() {
 const serverHTML = '<h1>This is HTML content from the server.</>';
 const htmlContent = { __html: serverHTML };

 return (
   <div>
     <div dangerouslySetInnerHTML={htmlContent}></div>
   </div>
 );
}

```
