require([
    "jquery",
    'Magento_Swatches/js/swatch-renderer'
], 
function($) {
  "use strict";

    $.mage.SwatchRenderer.prototype.imageHover = function(images, context) {
        var newSource = '';
        for (var i = 0; i <= images.length-1; i++) {
            if (typeof images[i]['isMain'] === "undefined") {
                var newSource = images[i]['img'];
                break;
            }
        }
        if (newSource) {
            context.find('a.product-item-photo').data('altimg', newSource);
        }
    }

    /**
     * Override updateBaseImage() 
     * - if not Product View, call imageHover()
     */
    $.mage.SwatchRenderer.prototype.updateBaseImage = function (images, context, isProductViewExist) {
        console.log('qweqwe');
        var justAnImage = images[0],
            updateImg,
            imagesToUpdate,
            gallery = context.find(this.options.mediaGallerySelector).data('gallery'),
            item;

        if (isProductViewExist) {
            imagesToUpdate = images.length ? this._setImageType($.extend(true, [], images)) : [];

            if (this.options.onlyMainImg) {
                updateImg = imagesToUpdate.filter(function (img) {
                    return img.isMain;
                });
                item = updateImg.length ? updateImg[0] : imagesToUpdate[0];
                gallery.updateDataByIndex(0, item);

                gallery.seek(1);
            } else {
                gallery.updateData(imagesToUpdate);
                $(this.options.mediaGallerySelector).AddFotoramaVideoEvents();
            }
        } else if (justAnImage && justAnImage.img) {
            context.find('.product-image-photo').attr('src', justAnImage.img);

            // icube: call custom function: imageHover()
            this.imageHover(images, context);
        }
    };

    // image on hover
    var sourceSwap = function() {
        var _this = $(this);
        var oldSource = _this.find('img.product-image-photo').attr('src');
        var newSource = _this.find('a.product-item-photo').data('altimg');
        if (newSource) {
            _this.find('a.product-item-photo').data('altimg', oldSource);
            _this.find('img.product-image-photo').attr('src', newSource);
        }
    }
    $(document).ready(function() {
        $('.product-items li.item').each(function() {
            $(this).hover(sourceSwap, sourceSwap);
        });
    });

  return;
});