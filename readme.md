# Circle Progress

A simple, lightweight solution for displaying progress bars in a circular fashion.

## Features
* Color options
* Set the size of the ring


## Quickstart

```javascript
// Init
$('#progress').circle();

//  Set options
$('#progress').circle("update", {
    //  Options
});

//  Destroy
$('#progress').circle("destroy");
```

## Options

```javascript
{
	fillStyle: "#FFF", // Color of the circle
	strokeStyle: "#DC2F64", // Color of the loaded portion
	lineWidth: 10, // Width of the ring
	value: 0, // 0-1
	fade: false // If the ring should expand on start
}
```