/* global angular firebase */
angular.module("bkApp").factory('containerService', [function() {
	var extras = {};
	
    return {
        getImageName: function(container) {
			if (container.Image.match(':') && container.Image.match('/')) {
				return container.Image.split('/')[1].split(':')[0];
			} else if (container.Image.match(':')) {
				return container.Image.split(':')[0];
			} else if (container.Image.match('/')) {
				return container.Image.split('/')[1];
			}
			return container.Image;
		},

		getDescription: function(container) {
			var extra = extras[this.getImageName(container)];
			if (extra) {
				return extra.description;
			}
			return "";
		},
		
		getBgClass: function(container) {
			var extra = extras[this.getImageName(container)];
			if (extra) {
				return extra.bgClass;
			}
			return "bg-aqua";
		},
		
		getIconClass: function(container) {
			var extra = extras[this.getImageName(container)];
			if (extra) {
				return extra.iconClass;
			}
			return "fa fa-docker";
		},

		isSecure: function(container) {
			return container.NetworkSettings.Networks.secure;
		},

		isPublic: function(container) {
			return container.NetworkSettings.Networks.bridge && this.getPublicPort(container);
		},

		getName: function(container) {
			if (container && container.Labels && container.Labels['com.docker.compose.service']) {
				return container.Labels['com.docker.compose.service'];
			}
			if (this.isSecure(container) && container.NetworkSettings.Networks.secure.Aliases) {
				return container.NetworkSettings.Networks.secure.Aliases[0];
			}
			return container.Names[0].substring(1);
		},

		getPrivatePort: function(container) {
			for (var i = 0; i < container.Ports.length; i++) {
				if (container.Ports[i].PrivatePort) {
					return container.Ports[i].PrivatePort;
				}
			}
		},

		getPublicPort: function(container) {
			for (var i = 0; i < container.Ports.length; i++) {
				if (container.Ports[i].IP === "0.0.0.0" && container.Ports[i].PublicPort) {
					return container.Ports[i].PublicPort;
				}
			}
		},

		getSecureUrl: function(container, hostname) {
			return "https://" + this.getName(container) + "-" + this.getPrivatePort(container) + "-" + hostname + ".buildkit.io";
		},

		getPublicUrl: function(hostname) {
			return "https://" + hostname + ".buildkit.io";
		}
    };
}]);
