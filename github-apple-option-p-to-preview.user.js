// ==UserScript==
// @name        GitHub Apple-Option-P to Preview
// @namespace   com.teddywing
// @description Enables Apple-Option-P to toggle the Preview pane
// @version     0.0.2
// @match       https://*.github.com/*
// @grant       none
// ==/UserScript==

// Copyright (c) 2017, 2022  Teddy Wing
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

var KEY_CODE_P = 80;


document.documentElement.addEventListener(
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
