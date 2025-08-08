import { Button, Image, Radio, Modal } from "antd";
import React from "react";
import { Config } from "../../util/config";
import styles from "./ProductItem.module.css";
import { MdAddCircle } from "react-icons/md";
import PropTypes from "prop-types";
function ProductItem({
    id,
    name,
    description,
    image,
    images = [], // new prop for multiple images, default to empty array
    category_name,
    brand,
    price,
    discount,
    // barcode,
    handleAdd,
    qty,
}) {
    const [sugarLevel, setSugarLevel] = React.useState(0);
    const [modalOpen, setModalOpen] = React.useState(false);
    const imageList = images.length > 0 ? images : [image];
    const [selectedImageIdx, setSelectedImageIdx] = React.useState(0);

    const handleAddWithSugar = () => {
        handleAdd({
            id,
            name,
            description,
            image: imageList[selectedImageIdx], // Use selected image
            category_name,
            brand,
            price,
            discount,
            qty,
            sugarLevel: sugarLevel
        });
        setModalOpen(false);
    };

    const handleImageClick = () => {
        setModalOpen(true);
    };

    const handlePrevImage = (e) => {
        e.stopPropagation();
        setSelectedImageIdx((prev) => (prev - 1 + imageList.length) % imageList.length);
    };

    const handleNextImage = (e) => {
        e.stopPropagation();
        setSelectedImageIdx((prev) => (prev + 1) % imageList.length);
    };

    var final_price = price;
    if (discount != 0 && discount != null) {
        final_price = price - (price * discount) / 100;
        final_price = final_price.toFixed(2);
    }
    return (
        <div className={styles.contianer} >
            <Image
                src={Config.image_path + imageList[selectedImageIdx]}
                alt={name}
                preview={false}
                style={{ borderRadius: '20px', width: '350px', height: '300px', justifyContent: 'center', cursor: 'pointer' }}
                onClick={handleImageClick}
            />
            <Modal
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                footer={null}
                centered
                width={400}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '350px', height: '300px' }}>
                        <Image
                            src={Config.image_path + imageList[selectedImageIdx]}
                            alt={name}
                            preview={false}
                            style={{ borderRadius: '20px', width: '350px', height: '300px' }}
                        />
                        {imageList.length > 1 && (
                            <>
                                <Button
                                    style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}
                                    onClick={handlePrevImage}
                                    size="small"
                                >{`<`}</Button>
                                <Button
                                    style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
                                    onClick={handleNextImage}
                                    size="small"
                                >{`>`}</Button>
                            </>
                        )}
                    </div>
                    <div style={{ marginTop: 16, width: '100%' }}>
                        <Radio.Group
                            value={sugarLevel}
                            onChange={(e) => setSugarLevel(e.target.value)}
                            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}
                        >
                            <Radio value={0}>0%</Radio>
                            <Radio value={25}>25%</Radio>
                            <Radio value={50}>50%</Radio>
                            <Radio value={75}>75%</Radio>
                            <Radio value={100}>100%</Radio>
                        </Radio.Group>
                    </div>
                    <Button
                        type="primary"
                        style={{ marginTop: 16, width: '100%' }}
                        icon={<MdAddCircle />}
                        onClick={handleAddWithSugar}
                    >
                        Confirm
                    </Button>
                </div>
            </Modal>
            <div className={styles.p_name + " truncate-text"}>{name} {description} </div>
            <div className={styles.p_des}>
                {category_name} - {brand}
            </div>
            {/* <div className={styles.p_des}>{description}</div> */}
            {/* <div className={styles.p_des}>
        <Tag color={qty <= 0 ? 'red' : 'green'}>
          {qty <= 0 ? 'Out of Stock' : 'In Stock'}
        </Tag>
      </div> */}
            {discount != 0 && discount != null ? (
                <div className={styles.p_price_container}>
                    <div className={styles.p_price}>{price}$</div>
                    <div className={styles.p_dis}> {discount}%</div>
                    <div className={styles.p_final_price}> {final_price}$</div>
                </div>
            ) : (
                <div className={styles.p_price_container}>
                    <div className={styles.p_final_price}> {price}$</div>
                </div>
            )}
            <div className={styles.p_des}>
                <Radio.Group
                    value={sugarLevel}
                    onChange={(e) => setSugarLevel(e.target.value)}
                    style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}
                >
                    <Radio value={0}>0%</Radio>
                    <Radio value={25}>25%</Radio>
                    <Radio value={50}>50%</Radio>
                    <Radio value={75}>75%</Radio>
                    <Radio value={100}>100%</Radio>
                </Radio.Group>
            </div>
            <div className={styles.btnAddContainer}>
                <Button
                    onClick={handleAddWithSugar}
                    type="primary"
                    icon={<MdAddCircle />}
                />
            </div>
        </div>
    );
}
ProductItem.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category_name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number,
    // barcode: PropTypes.string.isRequired,
    handleAdd: PropTypes.func.isRequired,
    qty: PropTypes.number.isRequired,
};

export default ProductItem;


