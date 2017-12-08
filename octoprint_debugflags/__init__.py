# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin

class DebugflagsPlugin(octoprint.plugin.AssetPlugin,
                       octoprint.plugin.TemplatePlugin):

	def get_assets(self):
		return dict(
			js=["js/debugflags.js"],
			css=["css/debugflags.css"],
			less=["less/debugflags.less"]
		)

	def get_update_information(self):
		return dict(
			debugflags=dict(
				displayName="Debugflags Plugin",
				displayVersion=self._plugin_version,

				# version check: github repository
				type="github_release",
				user="ntoff",
				repo="OctoPrint-Debugflags",
				current=self._plugin_version,

				# update method: pip
				pip="https://github.com/ntoff/OctoPrint-Debugflags/archive/{target_version}.zip"
			)
		)

__plugin_name__ = "Repetier Debug Flags"
__plugin_description__ = "Buttons to set Repetier Firmware's debug flags (some may or may not work depending on firmware version)."

def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = DebugflagsPlugin()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}

