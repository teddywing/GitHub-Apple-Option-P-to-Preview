// ==UserScript==
// @name        GitHub Apple-Option-P to Preview
// @namespace   com.teddywing
// @description Enables Apple-Option-P to toggle the Preview pane
// @version     0.0.1
// @match       https://*.github.com/*
// @grant       none
// ==/UserScript==

var KEY_CODE_P = 80;


document.body.addEventListener(
	'keydown',
	function(e) {
		var node = e.target;

		if (node.type !== 'textarea' ||
			node.className.indexOf('js-comment-field') === -1) {
			return;
		}

		if (e.metaKey && e.altKey && e.keyCode == KEY_CODE_P) {
			show_preview_pane(node);

			var write_tab = node
				.closest('.js-previewable-comment-form')
				.querySelector('.js-write-tab');
			window.setTimeout(function() {
				register_pane_toggle_shortcut(write_tab);
			});
		}
	}
);


function show_preview_pane (node) {
	node
		.closest('.js-previewable-comment-form')
		.querySelector('.js-preview-tab')
		.click();
}

function register_pane_toggle_shortcut (write_tab) {
	document.body.addEventListener('keydown', toggle_write_pane);

	function toggle_write_pane (e) {
		if (e.metaKey && e.altKey && e.keyCode == KEY_CODE_P) {
			write_tab.click();

			document.body.removeEventListener('keydown', toggle_write_pane);
		}
	}
}
