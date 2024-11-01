package com.edu.shop.model.request;

import lombok.Data;

@Data
public class OrderRequest {
    private InvoiceRequest invoiceRequest;
    private CartItemsRequest[] cartItemsRequest;

    // getters and setters
}
