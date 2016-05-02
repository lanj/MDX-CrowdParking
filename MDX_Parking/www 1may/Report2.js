
Spry.Utils.addLoadListener(function() {
	Spry.$$("#repMenu").addEventListener('click', function(e){ register() }, false);
	Spry.$$("#repMenu").addEventListener('click', function(e){ leave() }, false);
});
