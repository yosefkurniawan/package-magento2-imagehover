[![Magento](http://www.fishbowlinventory.com/w/images/b/b8/Icon.Magento.png)](http://devdocs.magento.com/)

### Package
package-magento2-imagehover

### Module
Icube_ImageHover

### Dependency
Magento_Catalog
Magento_Swatch

### Description
This module is used for showing alternative image on hovering product item on product list.

### How to use
On product list template, call the available alternative image of a product like so:
```$_hoverImage = $_helperGallery->getHoverImage($_product);```

Then add data-altimg attribute on prdocut image anchor tag, e.g:
```<a href="<?php /* @escapeNotVerified */ echo $_product->getProductUrl() ?>" class="product photo product-item-photo" tabindex="-1" data-altimg="<?php echo $_hoverImage ?>">
      <?php echo $productImage->toHtml(); ?>
</a>```

