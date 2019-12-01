## v0.1.3

Discovered that when tabs are 'attached' to a different window, the target window does not receive focus. By utilizing the 'windows.update' api with '{ focused:true }', the target window gets the expected mouse/keyboard focus. Combined with the original workaround idea, this fixes the issue when moving new tabs between existing windows, and to a newly create window.

Removed the custom new tab and homepage pages, as they are no longer necessary.

## v0.1.1

Added uuid to manifest.

## v0.1

Simple event listening extension.
