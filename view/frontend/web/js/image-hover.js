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
            context.find('img.product-image-photo-alt').remove();
            var img = context.find('img.product-image-photo');
            var altImg = context.find('img.product-image-photo-alt');
            var imgContainer = context.find('a.product-item-photo');
            var attrAlt = img.attr('alt');
            var attrWidth = img.attr('width');
            var attrHeight = img.attr('height');
            var altImgElm = '<img class="product-image-photo-alt" src="' + newSource + '" height="' + attrHeight + '" width="' + attrWidth + '" alt="' + attrAlt + '"  style="display:none;" />';

            img.before(altImgElm);
            altImg = context.find('img.product-image-photo-alt');
            img.addClass('swatch-option-loading'); 
        }
    }

    /**
     * Override updateBaseImage() 
     * - if not Product View, call imageHover()
     */
    $.mage.SwatchRenderer.prototype.updateBaseImage = function (images, context, isProductViewExist) {
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
    $(document).ready(function() {
        $('.product-items li.item .product-item-images').each(function() {
            var _this = $(this);
            var img = _this.find('img.product-image-photo');
            var imgContainer = _this.find('a.product-item-photo');
            var oldSource = _this.find('img.product-image-photo').attr('src');
            var newSource = _this.find('a.product-item-photo').data('altimg');
            _this.hover(function() { 
                var altImg = _this.find('img.product-image-photo-alt');
                if (newSource) {
                    if (!altImg.length) {
                        var attrAlt = img.attr('alt');
                        var attrWidth = img.attr('width');
                        var attrHeight = img.attr('height');
                        var altImgElm = '<img class="product-image-photo-alt" src="' + newSource + '" height="' + attrHeight + '" width="' + attrWidth + '" alt="' + attrAlt + '" style="display:none;"/>';

                        img.before(altImgElm);
                        altImg = _this.find('img.product-image-photo-alt');
                        img.addClass('swatch-option-loading'); 

                        altImg.load(function() { 
                            img.removeClass('swatch-option-loading'); 
                            img.hide();
                            altImg.show();
                        });

                    }else{
                        altImg.show()
                        img.hide();
                    }
                }
            }, function() {
                var altImg = _this.find('img.product-image-photo-alt');
                img.show()
                altImg.hide();
            });
        });
    });

  return;
});