var face;
var spin_rate = 0;
var spin_grad = 0;
var spin_adapt = 10;
var spin = 0;
var spin_func;

/**
 * Called once page is loaded
 */
function pageLoad()
{
	
	face = document.getElementById('face');
	// Makes the face spin at 20 fps
	spin_func = window.setInterval(() => {
		spin_grad = ((spin_adapt-1)*spin_grad+spin_rate)/spin_adapt;
		spin += spin_grad;
		face.style['transform'] = 'rotate('+spin+'deg)';
		// Make the screen shake beyond a certain spin threshold
		document.body.style.top = (Math.random()-0.5)*Math.max(spin_grad/2-5,0)+'px';
		document.body.style.left = (Math.random()-0.5)*Math.max(spin_grad/2-5,0)+'px';
		document.body.style.backgroundPosition = (Math.random()-0.5)*Math.max(spin_grad/2-5,0)+'px '
		+(Math.random()-0.5)*Math.max(spin_grad/2-5,0)+'px';
		if(spin_grad >= 60)
		{
			// Make it stop
			spin_grad = 59;
			spin_rate = 0;
			spin_adapt = 40;
			document.body.style.backgroundImage = 'url("scorched_background.svg")';
			document.getElementById('boom').style.visibility = 'visible';
			let b = document.getElementById('spin-button')
			b.disabled = true;
			b.innerHTML = 'What have you done';
			face.data = 'not_so_happy_face.svg';
			// window.clearInterval(spin_func);
			window.setTimeout(() => {
				document.getElementById('boom').style.visibility = 'hidden';
			},2500);
			window.setTimeout(() => {
				let s = document.getElementById('shame');
				s.style.opacity = '1';
				s.style.top = '100px';
			},1200);
			
		}
	},50);
}

/**
 * Called when spin button is pressed
 */
function increaseSpin()
{
	spin_rate = (spin_rate*1.01)+0.2;
	document.getElementById('spin-button').innerHTML = 'Faster!';
	console.log('spinning faster');
}